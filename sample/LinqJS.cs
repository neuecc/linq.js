// Ms-PL License
// linq.js C# backport
// http://linqjs.codeplex.com/

using System.Collections.Generic;
using System.Text;
using System.Collections;

namespace System.Linq
{
    public static class LinqJS
    {
        #region Generating Methods

        public static IEnumerable<T> Choice<T>(params T[] values)
        {
            var rand = new Random();
            while (true)
            {
                yield return values[rand.Next(values.Length)];
            }
        }

        public static IEnumerable<T> Cycle<T>(params T[] values)
        {
            while (true)
            {
                foreach (var item in values)
                {
                    yield return item;
                }
            }
        }

        public static IEnumerable<int> Range(int start, int count)
        {
            return Range(start, count, 1);
        }

        public static IEnumerable<int> Range(int start, int count, int step)
        {
            return ToInfinity(start, step).Take(count);
        }

        public static IEnumerable<int> RangeDown(int start, int count)
        {
            return RangeDown(start, count, 1);
        }

        public static IEnumerable<int> RangeDown(int start, int count, int step)
        {
            return ToNegativeInfinity(start, step).Take(count);
        }

        public static IEnumerable<int> RangeTo(int from, int to)
        {
            return RangeTo(from, to, 1);
        }

        public static IEnumerable<int> RangeTo(int from, int to, int step)
        {
            return (from < to)
                ? ToInfinity(from, step).TakeWhile(i => i <= to)
                : ToNegativeInfinity(from, step).TakeWhile(i => i >= to);
        }

        public static IEnumerable<T> Return<T>(T value)
        {
            return Enumerable.Repeat(value, 1);
        }

        public static IEnumerable<T> Generate<T>(Func<T> func)
        {
            while (true)
            {
                yield return func();
            }
        }

        public static IEnumerable<T> Generate<T>(Func<T> func, int count)
        {
            return Generate(func).Take(count);
        }

        public static IEnumerable<int> ToInfinity()
        {
            return ToInfinity(0);
        }

        public static IEnumerable<int> ToInfinity(int start)
        {
            return ToInfinity(start, 1);
        }

        public static IEnumerable<int> ToInfinity(int start, int step)
        {
            while (true)
            {
                yield return start;
                start += step;
            }
        }

        public static IEnumerable<int> ToNegativeInfinity()
        {
            return ToNegativeInfinity(0);
        }

        public static IEnumerable<int> ToNegativeInfinity(int start)
        {
            return ToNegativeInfinity(start, 1);
        }

        public static IEnumerable<int> ToNegativeInfinity(int start, int step)
        {
            return ToInfinity(start, -step);
        }

        public static IEnumerable<T> Unfold<T>(T seed, Func<T, T> func)
        {
            yield return seed;
            var value = seed;
            while (true)
            {
                value = func(value);
                yield return value;
            }
        }

        #endregion

        #region Projection and Filtering Methods

        public static IEnumerable<T> CascadeDepthFirst<T>(this IEnumerable<T> source, Func<T, IEnumerable<T>> selector)
        {
            return source.CascadeDepthFirst(selector, t => t);
        }

        public static IEnumerable<R> CascadeDepthFirst<T, R>(this IEnumerable<T> source, Func<T, IEnumerable<T>> selector, Func<T, R> resultSelector)
        {
            return source.CascadeDepthFirst(selector, (t, _) => resultSelector(t));
        }

        public static IEnumerable<R> CascadeDepthFirst<T, R>(this IEnumerable<T> source, Func<T, IEnumerable<T>> selector, Func<T, int, R> resultSelector)
        {
            return source.DepthFirstSearch(selector, 0).Select(kvp => resultSelector(kvp.Key, kvp.Value));
        }

        private static IEnumerable<KeyValuePair<T, int>> DepthFirstSearch<T>(this IEnumerable<T> source, Func<T, IEnumerable<T>> selector, int depth)
        {
            foreach (var item in source)
            {
                yield return new KeyValuePair<T, int>(item, depth);
                foreach (var subitem in selector(item).DepthFirstSearch(selector, depth + 1))
                {
                    yield return subitem;
                }
            }
        }

        public static IEnumerable<T> CascadeBreadthFirst<T>(this IEnumerable<T> source, Func<T, IEnumerable<T>> selector)
        {
            return source.CascadeBreadthFirst(selector, t => t);
        }

        public static IEnumerable<R> CascadeBreadthFirst<T, R>(this IEnumerable<T> source, Func<T, IEnumerable<T>> selector, Func<T, R> resultSelector)
        {
            return source.CascadeBreadthFirst(selector, (t, _) => resultSelector(t));
        }

        /// <see cref="http://d.hatena.ne.jp/NyaRuRu/20080115/p1"/>
        public static IEnumerable<R> CascadeBreadthFirst<T, R>(this IEnumerable<T> source, Func<T, IEnumerable<T>> selector, Func<T, int, R> resultSelector)
        {
            var depth = 0;
            var buffer = source.ToArray();
            while (buffer.Any())
            {
                foreach (var item in buffer) yield return resultSelector(item, depth);
                buffer = buffer.SelectMany(selector).ToArray();
                depth++;
            }
        }

        public static IEnumerable<T> Flatten<T>(this IEnumerable source)
        {
            foreach (var item in source)
            {
                var subsource = item as IEnumerable;
                if (subsource != null)
                {
                    foreach (var subitem in subsource.Flatten<T>())
                    {
                        yield return subitem;
                    }
                }
                else
                {
                    yield return (T)item;
                }
            }
        }

        public static IEnumerable<R> Pairwise<T, R>(this IEnumerable<T> source, Func<T, T, R> selector)
        {
            var isFirst = true;
            var prev = default(T);
            foreach (var item in source)
            {
                if (isFirst)
                {
                    prev = item;
                    isFirst = false;
                    continue;
                }
                yield return selector(prev, item);
                prev = item;
            }
        }

        public static IEnumerable<T> Scan<T>(this IEnumerable<T> source, Func<T, T, T> func)
        {
            var isFirst = true;
            var value = default(T);
            foreach (var item in source)
            {
                if (isFirst)
                {
                    isFirst = false;
                    value = item;
                    yield return value;
                    continue;
                }
                value = func(value, item);
                yield return value;
            }
        }

        public static IEnumerable<TA> Scan<T, TA>(this IEnumerable<T> source, TA seed, Func<TA, T, TA> func)
        {
            return source.Scan(seed, func, x => x);
        }

        public static IEnumerable<TR> Scan<T, TA, TR>(this IEnumerable<T> source, TA seed, Func<TA, T, TA> func, Func<TA, TR> resultSelector)
        {
            yield return resultSelector(seed);
            var value = seed;
            foreach (var item in source)
            {
                value = func(value, item);
                yield return resultSelector(value);
            }
        }

        //Obsolete .NET 4]
        //public static IEnumerable<R> zip<T1, T2, R>(this IEnumerable<T1> source, IEnumerable<T2> source2, Func<T1, T2, R> selector)
        //{
        //    using (var e1 = source.GetEnumerator())
        //    using (var e2 = source2.GetEnumerator())
        //    {
        //        while (e1.MoveNext() && e2.MoveNext())
        //        {
        //            yield return selector(e1.Current, e2.Current);
        //        }
        //    }
        //}

        #endregion

        #region Set Methods

        public static IEnumerable<T> Insert<T>(this IEnumerable<T> source, int index, IEnumerable<T> second)
        {
            var count = 0;
            foreach (var item in source)
            {
                if (count++ == index)
                {
                    foreach (var subitem in second) yield return subitem;
                }
                yield return item;
            }
        }

        #endregion

        #region Ordering Methods

        public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source)
        {
            var rand = new Random();
            return source.OrderBy(_ => rand.Next());
        }

        #endregion

        #region Paging Methods

        public static int IndexOf<T>(this IEnumerable<T> source, T value)
        {
            return source.IndexOf(value, EqualityComparer<T>.Default);
        }

        public static int IndexOf<T>(this IEnumerable<T> source, T value, EqualityComparer<T> comparer)
        {
            var index = 0;
            foreach (var item in source)
            {
                if (comparer.Equals(value, item)) return index;
                index++;
            }
            return -1;
        }

        public static int LastIndexOf<T>(this IEnumerable<T> source, T value)
        {
            return source.LastIndexOf(value, EqualityComparer<T>.Default);
        }

        public static int LastIndexOf<T>(this IEnumerable<T> source, T value, EqualityComparer<T> comparer)
        {
            var index = 0;
            var result = -1;
            foreach (var item in source)
            {
                if (comparer.Equals(value, item)) result = index;
                index++;
            }
            return result;
        }

        #endregion

        #region Convert Methods

        public static string ToStringJoin<T>(this IEnumerable<T> source)
        {
            return source.ToStringJoin("");
        }

        public static string ToStringJoin<T>(this IEnumerable<T> source, string separator)
        {
            var index = 0;
            return source.Aggregate(new StringBuilder(), (sb, v) =>
                    (index++ == 0) ? sb.Append(v) : sb.AppendFormat("{0}{1}", separator, v))
                .ToString();
        }

        public static string ToStringJoin<T, R>(this IEnumerable<T> source, string separator, Func<T, R> selector)
        {
            return source.Select(selector).ToStringJoin(separator);
        }

        #endregion

        #region Action Methods

        public static IEnumerable<T> Do<T>(this IEnumerable<T> source, Action<T> action)
        {
            return source.Do((v, i) => action(v));
        }

        public static IEnumerable<T> Do<T>(this IEnumerable<T> source, Action<T, int> action)
        {
            var index = 0;
            foreach (var item in source)
            {
                action(item, index++);
                yield return item;
            }
        }

        public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
        {
            source.ForEach((v, i) => action(v));
        }

        public static void ForEach<T>(this IEnumerable<T> source, Action<T, int> action)
        {
            source.Do(action).Force();
        }

        public static void Write<T>(this IEnumerable<T> source)
        {
            source.Write("");
        }

        public static void Write<T>(this IEnumerable<T> source, string separator)
        {
            source.ForEach((t, index) => Console.Write((index == 0) ? t.ToString() : separator + t));
        }

        public static void Write<T, R>(this IEnumerable<T> source, string separator, Func<T, R> selector)
        {
            source.Select(selector).Write(separator);
        }

        public static void WriteLine<T>(this IEnumerable<T> source)
        {
            source.ForEach(t => Console.WriteLine(t));
        }

        public static void WriteLine<T, R>(this IEnumerable<T> source, Func<T, R> selector)
        {
            source.Select(selector).WriteLine();
        }

        #endregion

        #region For Debug Methods

        public static void Force<T>(this IEnumerable<T> source)
        {
            using (var e = source.GetEnumerator())
            {
                while (e.MoveNext()) ;
            }
        }

        public static IEnumerable<T> Trace<T>(this IEnumerable<T> source)
        {
            return source.Do(t => Diagnostics.Trace.WriteLine(t));
        }

        #endregion
    }
}