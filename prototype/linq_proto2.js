/*
linq.js - prototype2
2009/01/29
*/

// Global Object
var Linq = {};

// Stream
Linq.Object = function(getValue, reset)
{
    this.GetValue = getValue; // as Function
    this.Reset = reset; // as Function
}

// Utility Methods
Linq.Utils =
{
    IsNull: function(/*variable argument*/)
    {
        for (var i = 0; i < arguments.length; i++)
        {
            if (arguments[i] == null) return true;
        }
        return false;
    },

    // Make anonymous function from lambda expression
    MakeFunction: function(expression)
    {
        if (typeof expression == "string")
        {
            var expr = expression.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
            expression = new Function(expr[1], "return " + expr[2]);
        }
        return expression;
    },

    // Endmark of Stream
    End: function() { }
}

// Generator
Linq.Enumerable =
{
    Cycle: function(/*variable argument*/)
    {
        if (arguments.length == 0) throw new Error("Cycle");
        var args = arguments;
        var index = 0;

        var getValue = function()
        {
            if (index >= args.length) index = 0;
            return args[index++];
        }

        var reset = function()
        {
            index = 0;
        }

        return new Linq.Object(getValue, reset);
    },

    Empty: function()
    {
        var getValue = function() { return Linq.Utils.End }
        var reset = function() { }
        return new Linq.Object(getValue, reset);
    },

    From: function(obj)
    {
        if (Linq.Utils.IsNull(obj)) throw new Error("From");

        if (typeof obj == "number" || typeof obj == "string")
        {
            return Linq.Enumerable.Repeat(obj, 1);
        }
        if (!(obj instanceof Array)) // Object or Function
        {
            // Make KeyValuePair
            var array = [];
            for (var key in obj)
            {
                if (!(obj[key] instanceof Function))
                {
                    array.push({ key: key, value: obj[key] });
                }
            }
            obj = array; // Create Array
        }
        // case:Array
        {
            var index = 0;
            var source = obj;

            var getValue = function()
            {
                while (index < source.length)
                {
                    if (!(obj[index] instanceof Function)) return obj[index++];
                    index++;
                }
                return Linq.Utils.End;
            }

            var reset = function()
            {
                index = 0;
            }

            return new Linq.Object(getValue, reset);
        }
    },

    Range: function(start, count)
    {
        if (Linq.Utils.IsNull(start, count)) throw new Error("Range");
        if (count < 0) throw new Error("Range:count is less than 0");
        var index = 0;

        var getValue = function()
        {
            return (index < count) ? start + index++ : Linq.Utils.End;
        }

        var reset = function()
        {
            index = 0;
        }

        return new Linq.Object(getValue, reset);
    },

    RangeDown: function(start, count)
    {
        if (Linq.Utils.IsNull(start, count)) throw new Error("RangeDown");
        if (count < 0) throw new Error("Range:count is less than 0");
        var index = 0;

        var getValue = function()
        {
            return (index < count) ? start - index++ : Linq.Utils.End;
        }

        var reset = function()
        {
            index = 0;
        }

        return new Linq.Object(getValue, reset);
    },

    Repeat: function(obj, num)
    {
        if (Linq.Utils.IsNull(obj, num)) throw new Error("Repeat");
        var count = 0;

        var getValue = function()
        {
            return (count++ < num) ? obj : Linq.Utils.End;
        }

        var reset = function()
        {
            count = 0;
        }

        return new Linq.Object(getValue, reset);
    },

    // Overload:function()
    // Overload:function(start)
    ToInfinity: function(start)
    {
        if (start == null) start = 0;
        return Linq.Enumerable.Range(start, Number.POSITIVE_INFINITY);
    },

    // Overload:function()
    // Overload:function(start)
    ToNegativeInfinity: function(start)
    {
        if (start == null) start = 0;
        return Linq.Enumerable.RangeDown(start, Number.POSITIVE_INFINITY);
    }
}

Linq.Object.prototype =
{
    // Projection and Filtering Methods
    

    // Overload:function(func)
    // Overload:function(seed,func<value,element>)
    // Overload:function(seed,func<value,element>,resultSelector)
    Scan: function(/*variable argument*/)
    {
        if (arguments.length == 0) throw new Error("Scan");

        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var func;
        var seed;
        var resultSelector;
        var value;

        // case:function(func)
        if (arguments.length == 1)
        {
            func = Linq.Utils.MakeFunction(arguments[0]);
        }
        else // case:function(seed,func) , case:function(seed,func,resultSelector)
        {
            seed = arguments[0];
            func = Linq.Utils.MakeFunction(arguments[1]);
            resultSelector = Linq.Utils.MakeFunction(arguments[2]);
        }
        if (resultSelector == null) resultSelector = function(x) { return x; };

        var getValue = function()
        {
            if (value == null) // Initialize
            {
                value = (seed == null) ? prevGetValue() : seed;
                if (value != Linq.Utils.End) return resultSelector(value);
            }
            else
            {
                var elem = prevGetValue();
                if (elem != Linq.Utils.End)
                {
                    value = func(value, elem);
                    return resultSelector(value);
                }
            }
            return Linq.Utils.End;
        }

        var reset = function()
        {
            value = null;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    // Overload:function(selector<element>)
    // Overload:function(selector<element,index>)
    Select: function(selector)
    {
        if (Linq.Utils.IsNull(selector)) throw new Error("Select")
        selector = Linq.Utils.MakeFunction(selector);
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var index = 0;

        var getValue = function()
        {
            var value = prevGetValue();
            return (value != Linq.Utils.End) ? selector(value, index++) : Linq.Utils.End;
        }

        var reset = function()
        {
            index = 0;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    // Overload:function(collectionSelector<element>)
    // Overload:function(collectionSelector<element,index>)
    // Overload:function(collectionSelector<element>,resultSelector)
    // Overload:function(collectionSelector<element,index>,resultSelector)
    SelectMany: function(collectionSelector, resultSelector)
    {
        if (Linq.Utils.IsNull(collectionSelector)) throw new Error("SelectMany")
        collectionSelector = Linq.Utils.MakeFunction(collectionSelector);
        resultSelector = Linq.Utils.MakeFunction(resultSelector);
        if (resultSelector == null) resultSelector = function(a, b) { return b };
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var index = 0;
        var firstElem;
        var middleSequence;

        var getValue = function()
        {
            do
            {
                var middleElem = (middleSequence != null) ? middleSequence.GetValue() : Linq.Utils.End;
                if (middleElem != Linq.Utils.End)
                {
                    return resultSelector(firstElem, middleElem)
                }
                else // Sequence Initialize
                {
                    firstElem = prevGetValue();
                    if (firstElem == Linq.Utils.End) return Linq.Utils.End;
                    middleSequence = collectionSelector(firstElem, index++);
                }
            } while (firstElem != Linq.Utils.End)
            return Linq.Utils.End;
        }

        var reset = function()
        {
            index = 0;
            firstElem = null;
            middleSequence.Reset();
            middleSequence = null;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    // Overload:function(predicate<element>)
    // Overload:function(predicate<element,index>)
    Where: function(predicate)
    {
        if (Linq.Utils.IsNull(predicate)) throw new Error("Where")
        predicate = Linq.Utils.MakeFunction(predicate);
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var index = 0;

        var getValue = function()
        {
            var value;
            while ((value = prevGetValue()) != Linq.Utils.End)
            {
                if (predicate(value, index++)) return value;
            }
            return Linq.Utils.End;
        }

        var reset = function()
        {
            index = 0;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    // Overload:function(second,selector<outer,inner>)
    // Overload:function(second,selector<outer,inner,index>)
    ZipWith: function(second, selector)
    {
        if (Linq.Utils.IsNull(second, selector)) throw new Error("ZipWith")
        selector = Linq.Utils.MakeFunction(selector);
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var index = 0;

        var getValue = function()
        {
            var outer = prevGetValue();
            var inner = second.GetValue();
            return (outer != Linq.Utils.End && inner != Linq.Utils.End) ?
                selector(outer, inner, index++) : Linq.Utils.End;
        }

        var reset = function()
        {
            index = 0;
            second.Reset();
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    // Join Methods
    Join: function(inner, outerKeySelector, innerKeySelector, resultSelector)
    {
        if (Linq.Utils.IsNull(inner, outerKeySelector, innerKeySelector, resultSelector))
        {
            throw new Error("Join")
        }
        outerKeySelector = Linq.Utils.MakeFunction(outerKeySelector);
        innerKeySelector = Linq.Utils.MakeFunction(innerKeySelector);
        resultSelector = Linq.Utils.MakeFunction(resultSelector);
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var outerValue;

        var getValue = function()
        {
            do
            {
                if (outerValue == null) outerValue = prevGetValue(); // Initialize
                var innerValue;
                while ((innerValue = inner.GetValue()) != Linq.Utils.End)
                {
                    if (outerKeySelector(outerValue) == innerKeySelector(innerValue))
                    {
                        return resultSelector(outerValue, innerValue);
                    }
                }
                inner.Reset();
            } while ((outerValue = prevGetValue()) != Linq.Utils.End)
            return Linq.Utils.End;
        }

        var reset = function()
        {
            outerValue = null;
            inner.Reset();
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    GroupJoin: function(inner, outerKeySelector, innerKeySelector, resultSelector)
    {
        if (Linq.Utils.IsNull(inner, outerKeySelector, innerKeySelector, resultSelector))
        {
            throw new Error("GroupJoin")
        }
        outerKeySelector = Linq.Utils.MakeFunction(outerKeySelector);
        innerKeySelector = Linq.Utils.MakeFunction(innerKeySelector);
        resultSelector = Linq.Utils.MakeFunction(resultSelector);
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var lookup;

        var getValue = function()
        {
            if (lookup == null) lookup = inner.ToLookup(innerKeySelector); // Initialize
            var outerValue = prevGetValue();
            return (outerValue != Linq.Utils.End) ?
                resultSelector(outerValue, lookup[outerKeySelector(outerValue)]) :
                Linq.Utils.End;
        }

        var reset = function()
        {
            lookup = null;
            inner.Reset();
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    // Set Methods
    All: function(predicate)
    {
        try
        {
            if (Linq.Utils.IsNull(predicate)) throw new Error("All")
            predicate = Linq.Utils.MakeFunction(predicate);
            var value;
            while ((value = this.GetValue()) != Linq.Utils.End)
            {
                if (!predicate(value)) return false;
            }
            return true;
        }
        finally
        {
            this.Reset();
        }
    },

    // Overload:function()
    // Overload:function(predicate<element>)
    Any: function(predicate)
    {
        try
        {
            predicate = Linq.Utils.MakeFunction(predicate);
            var value = this.GetValue();
            // case:function()
            if (arguments.length == 0)
            {
                return (value != Linq.Utils.End) ? true : false;
            }
            // case:function(predicate)
            do
            {
                if (predicate(value)) return true;
            } while ((value = this.GetValue()) != Linq.Utils.End);
            return false;
        }
        finally
        {
            this.Reset();
        }
    },

    Concat: function(second)
    {
        if (Linq.Utils.IsNull(second)) throw new Error("Concat")
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var isEndFirst = false; // flag

        var getValue = function()
        {
            if (!isEndFirst)
            {
                var value = prevGetValue();
                if (value != Linq.Utils.End) return value;
                else isEndFirst = true;
            }
            return second.GetValue()
        }

        var reset = function()
        {
            isEndFirst = false;
            second.Reset();
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    Contains: function(value)
    {
        try
        {
            if (Linq.Utils.IsNull(value)) throw new Error("Contains")
            var element;
            while ((element = this.GetValue()) != Linq.Utils.End)
            {
                if (element == value) return true;
            }
            return false;
        }
        finally
        {
            this.Reset();
        }
    },

    DefaultIfEmpty: function(defaultValue)
    {
        if (Linq.Utils.IsNull(defaultValue)) throw new Error("DefaultIfEmpty")
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var isFirst = true; // flag

        var getValue = function()
        {
            var value = prevGetValue();
            if (isFirst && value == Linq.Utils.End)
            {
                isFirst = false;
                return defaultValue;
            }
            else
            {
                isFirst = false;
            }
            return value;
        }

        var reset = function()
        {
            isFirst = true;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    Distinct: function()
    {
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var keys = {};

        var getValue = function()
        {
            var value;
            while ((value = prevGetValue()) != Linq.Utils.End)
            {
                if (!keys.hasOwnProperty(value))
                {
                    keys[value] = null;
                    return value;
                }
            }
            return Linq.Utils.End;
        }

        var reset = function()
        {
            keys = {};
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    Except: function(second)
    {
        if (Linq.Utils.IsNull(second)) throw new Error("Except")
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var keys = {};

        var getValue = function()
        {
            var value;
            while ((value = prevGetValue()) != Linq.Utils.End)
            {
                if (!second.Contains(value) && !keys.hasOwnProperty(value))
                {
                    keys[value] = null;
                    return value;
                }
            }
            return Linq.Utils.End;
        }

        var reset = function()
        {
            keys = {};
            second.Reset();
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    Intersect: function(second)
    {
        if (Linq.Utils.IsNull(second)) throw new Error("Intersect")
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var keys = {};

        var getValue = function()
        {
            var value;
            while ((value = prevGetValue()) != Linq.Utils.End)
            {
                if (second.Contains(value) && !keys.hasOwnProperty(value))
                {
                    keys[value] = null;
                    return value;
                }
            }
            return Linq.Utils.End;
        }

        var reset = function()
        {
            keys = {};
            second.Reset();
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    SequenceEqual: function(second)
    {
        try
        {
            if (Linq.Utils.IsNull(second)) throw new Error("SequenceEqual")
            do
            {
                var firstValue = this.GetValue();
                var secondValue = second.GetValue();
                if (firstValue != secondValue) return false;
            } while (firstValue == Linq.Utils.End && secondValue == Linq.Utils.End)
            return true;
        }
        finally
        {
            second.Reset();
            this.Reset();
        }
    },

    Union: function(second)
    {
        if (Linq.Utils.IsNull(second)) throw new Error("Union")
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var isEndFirst = false; // flag
        var keys = {};

        var getValue = function()
        {
            var value;
            if (!isEndFirst)
            {
                while ((value = prevGetValue()) != Linq.Utils.End)
                {
                    if (!keys.hasOwnProperty(value))
                    {
                        keys[value] = null;
                        return value;
                    }
                }
                isEndFirst = true;
            }
            while ((value = second.GetValue()) != Linq.Utils.End)
            {
                if (!keys.hasOwnProperty(value))
                {
                    keys[value] = null;
                    return value;
                }
            }
            return Linq.Utils.End;
        }

        var reset = function()
        {
            isEndFirst = false;
            second.Reset();
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    // Ordering Methods
    OrderBy: function(keySelector)
    {
        if (Linq.Utils.IsNull(keySelector)) throw new Error("OrderBy")
        keySelector = Linq.Utils.MakeFunction(keySelector);
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var sortedList; // buffer

        var getValue = function()
        {
            if (sortedList == null) // Initialize
            {
                var array = [];
                var value;
                while ((value = prevGetValue()) != Linq.Utils.End)
                {
                    array.push(value);
                }
                array.sort(function(a, b) { return keySelector(a) - keySelector(b); });
                sortedList = Linq.Enumerable.From(array);
            }
            return sortedList.GetValue();
        }

        var reset = function()
        {
            sortedList = null;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    OrderByDescending: function(keySelector)
    {
        if (Linq.Utils.IsNull(keySelector)) throw new Error("OrderByDescending")
        keySelector = Linq.Utils.MakeFunction(keySelector);
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var sortedList; // buffer

        var getValue = function()
        {
            if (sortedList == null) // Initialize
            {
                var array = [];
                var value;
                while ((value = prevGetValue()) != Linq.Utils.End)
                {
                    array.push(value);
                }
                array.sort(function(a, b) { return keySelector(b) - keySelector(a); });
                sortedList = Linq.Enumerable.From(array);
            }
            return sortedList.GetValue();
        }

        var reset = function()
        {
            sortedList = null;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    Reverse: function()
    {
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var sortedList; // buffer

        var getValue = function()
        {
            if (sortedList == null) // Initialize
            {
                var array = [];
                var value;
                while ((value = prevGetValue()) != Linq.Utils.End)
                {
                    array.push(value);
                }
                array.reverse();
                sortedList = Linq.Enumerable.From(array);
            }
            return sortedList.GetValue();
        }

        var reset = function()
        {
            sortedList = null;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    Shuffle: function()
    {
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var randomList; // buffer

        var getValue = function()
        {
            if (randomList == null) // Initialize
            {
                var array = [];
                var value;
                while ((value = prevGetValue()) != Linq.Utils.End)
                {
                    array.push(value);
                }
                var i = array.length;
                while (i)
                {
                    var j = Math.floor(Math.random() * i);
                    var t = array[--i];
                    array[i] = array[j];
                    array[j] = t;
                }
                randomList = Linq.Enumerable.From(array);
            }
            return randomList.GetValue();
        }

        var reset = function()
        {
            randomList = null;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    // Grouping Methods

    // Overload:function(keySelector)
    // Overload:function(keySelector,elementSelector)
    // Overload:function(keySelector,elementSelector,resultSelector)
    GroupBy: function(keySelector, elementSelector, resultSelector)
    {
        if (Linq.Utils.IsNull(keySelector)) throw new Error("GroupBy")
        keySelector = Linq.Utils.MakeFunction(keySelector);
        elementSelector = Linq.Utils.MakeFunction(elementSelector);
        resultSelector = Linq.Utils.MakeFunction(resultSelector);
        if (elementSelector == null) elementSelector = function(x) { return x };
        if (resultSelector == null) resultSelector = function(x, y) { return { key: x, value: y} };
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var groupedList; // buffer

        var getValue = function()
        {
            if (groupedList == null)
            {
                // create lookup
                var lookup = {};
                var value;
                while ((value = prevGetValue()) != Linq.Utils.End)
                {
                    var key = keySelector(value);
                    var element = elementSelector(value);
                    if (lookup.hasOwnProperty(key))
                    {
                        lookup[key].push(element);
                    }
                    else
                    {
                        lookup[key] = [element];
                    }
                }
                groupedList = Linq.Enumerable.From(lookup);
            }
            var value = groupedList.GetValue();
            return (value != Linq.Utils.End) ?
                resultSelector(value.key, value.value) :
                Linq.Utils.End;
        }

        var reset = function()
        {
            groupedList = null;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    // Aggregate Methods

    // Overload:function(func)
    // Overload:function(seed,func)
    // Overload:function(seed,func,resultSelector)
    Aggregate: function(/*variable argument*/)
    {
        try
        {
            if (arguments.length == 0) throw new Error("Aggregate");

            var value;
            var element = this.GetValue();
            if (element == Linq.Utils.End) throw new Error("Aggregate:source contains no elements.");
            if (arguments.length == 1)
            {
                value = element;
                var func = Linq.Utils.MakeFunction(arguments[0]);
            }
            else
            {
                var func = Linq.Utils.MakeFunction(arguments[1]);
                var resultSelector = Linq.Utils.MakeFunction(arguments[2]);
                value = func(arguments[0], element); // use seed
            }
            if (resultSelector == null) resultSelector = function(x) { return x; };

            while ((element = this.GetValue()) != Linq.Utils.End)
            {
                value = func(value, element);
            }

            return resultSelector(value);
        }
        finally
        {
            this.Reset();
        }
    },

    Average: function()
    {
        try
        {
            var value;
            var sum = 0;
            var count = 0;
            while ((value = this.GetValue()) != Linq.Utils.End)
            {
                sum += value;
                count++;
            }
            return sum / count;
        }
        finally
        {
            this.Reset();
        }
    },

    Count: function()
    {
        try
        {
            var count = 0;
            while (this.GetValue() != Linq.Utils.End)
            {
                count++;
            }
            return count;
        }
        finally
        {
            this.Reset();
        }
    },

    Max: function()
    {
        return this.Aggregate(function(a, b) { return (a > b) ? a : b; });
    },

    Min: function()
    {
        return this.Aggregate(function(a, b) { return (a < b) ? a : b; });
    },

    Sum: function()
    {
        return this.Aggregate(function(a, b) { return a + b; });
    },

    // Paging Methods
    ElementAt: function(index)
    {
        try
        {
            if (Linq.Utils.IsNull(index)) throw new Error("ElementAt")
            if (index < 0) throw new Error("ElementAt:index is less than 0");
            var count = -1;
            var value;
            while ((value = this.GetValue()) != Linq.Utils.End)
            {
                count++;
                if (count == index) return value;
            }
            throw new Error("ElementAt:index is greater than or equal to the number of elements in source");
        }
        finally
        {
            this.Reset();
        }
    },

    //    ElementAtOrDefault: function(defaultValue, index)
    //    {
    //        if (Linq.Utils.IsNull(defaultValue, index)) throw new Error("ElementAtOrDefault")

    //        if (index >= this.source.length) return defaultValue;
    //        else return this.source[index];
    //    },

    // Overload:function()
    // Overload:function(predicate<element>)
    First: function(predicate)
    {
        try
        {
            predicate = Linq.Utils.MakeFunction(predicate);
            if (predicate == null) predicate = function() { return true }; // case:function()
            var value;
            while ((value = this.GetValue()) != Linq.Utils.End)
            {
                if (predicate(value)) return value;
            }
            throw new Error("First:Sequence is empty or No element satisfies the condition in predicate.");
        }
        finally
        {
            this.Reset();
        }
    },

    //    FirstOrDefault: function(defaultValue, predicate)
    //    {
    //        if (Linq.Utils.IsNull(defaultValue)) throw new Error("FirstOrDefault");
    //        predicate = Linq.Utils.AnalyzeExpression(predicate);

    //        if (this.source.length == 0) return defaultValue;
    //        if (predicate == null) return this.source[0];
    //        var value = this.First(predicate);
    //        return (value == null) ? defaultValue : value;
    //    },

    //    Last: function(predicate)
    //    {
    //        predicate = Linq.Utils.AnalyzeExpression(predicate);

    //        var source = this.source;
    //        if (source.length == 0) throw new Error("Last:sequence is empty");
    //        // case:function()
    //        if (predicate == null) return source[source.length - 1];
    //        // case:function(predicate)
    //        var temp;
    //        for (var i = 0; i < source.length; i++)
    //        {
    //            if (predicate(source[i])) temp = source[i];
    //        }
    //        return temp;
    //    },

    //    LastOrDefault: function(defaultValue, predicate)
    //    {
    //        if (Linq.Utils.IsNull(predicate, defaultValue)) throw new Error("LastOrDefault");
    //        predicate = Linq.Utils.AnalyzeExpression(predicate);

    //        var source = this.source;
    //        if (source.length == 0) return defaultValue;
    //        if (predicate == null)
    //        {
    //            return (this.source.length == 0) ? defaultValue : source[source.length - 1];
    //        }
    //        var value = this.Last(predicate);
    //        return (value == null) ? defaultValue : value;
    //    },

    //    Single: function(predicate)
    //    {
    //        predicate = Linq.Utils.AnalyzeExpression(predicate);

    //        var source = this.source;
    //        if (source.length == 0) throw new Error("Single:sequence is empty");
    //        // case:function()
    //        if (predicate == null)
    //        {
    //            if (source.length == 1)
    //            {
    //                return source[0];
    //            }
    //            else
    //            {
    //                throw new Error("Single:sequence contains more than one element.");
    //            }
    //        }
    //        // case:function(predicate)
    //        var temp;
    //        for (var i = 0; i < source.length; i++)
    //        {
    //            if (predicate(source[i]))
    //            {
    //                if (temp == null)
    //                {
    //                    temp = source[i];
    //                }
    //                else
    //                {
    //                    throw new Error("Single:sequence contains more than one element.");
    //                }
    //            }
    //        }
    //        return temp;
    //    },

    //    Skip: function(count)
    //    {
    //        if (Linq.Utils.IsNull(count)) throw new Error("Skip");

    //        var source = this.source;
    //        var array = [];
    //        for (var i = count; i < source.length; i++)
    //        {
    //            array.push(source[i]);
    //        }
    //        return new Linq.Object(array);
    //    },

    //    SkipWhile: function(predicate)
    //    {
    //        if (Linq.Utils.IsNull(predicate)) throw new Error("SkipWhile");
    //        predicate = Linq.Utils.AnalyzeExpression(predicate);

    //        var source = this.source;
    //        var array = [];
    //        for (var i = 0; i < source.length; i++)
    //        {
    //            if (predicate(source[i], i)) continue;
    //            array.push(source[i]);
    //        }
    //        return new Linq.Object(array);
    //    },

    Take: function(count)
    {
        if (Linq.Utils.IsNull(count)) throw new Error("Take");
        var prevGetValue = this.GetValue;
        var prevReset = this.Reset;
        var index = 0;

        var getValue = function()
        {
            var value = prevGetValue();
            return (index++ < count) ? value : Linq.Utils.End;
        }

        var reset = function()
        {
            index = 0;
            prevReset();
        }

        return new Linq.Object(getValue, reset);
    },

    //    TakeWhile: function(predicate)
    //    {
    //        if (Linq.Utils.IsNull(predicate)) throw new Error("TakeWhile");
    //        predicate = Linq.Utils.AnalyzeExpression(predicate);

    //        var source = this.source;
    //        var array = [];
    //        for (var i = 0; i < source.length; i++)
    //        {
    //            if (!predicate(source[i], i)) break;
    //            array.push(source[i]);
    //        }
    //        return new Linq.Object(array);
    //    },

    // Convert Methods
    ToArray: function()
    {
        try
        {
            var array = [];
            var value;
            while ((value = this.GetValue()) != Linq.Utils.End)
            {
                array.push(value);
            }
            return array;
        }
        finally
        {
            this.Reset();
        }
    },

    ToLookup: function(keySelector, elementSelector)
    {
        try
        {
            if (Linq.Utils.IsNull(keySelector)) throw new Error("ToLookup")
            keySelector = Linq.Utils.MakeFunction(keySelector);
            elementSelector = Linq.Utils.MakeFunction(elementSelector);
            if (elementSelector == null) elementSelector = function(x) { return x };
            var lookup = {};
            var value;
            while ((value = this.GetValue()) != Linq.Utils.End)
            {
                var key = keySelector(value);
                var element = elementSelector(value);
                if (lookup.hasOwnProperty(key))
                {
                    lookup[key].push(element);
                }
                else
                {
                    lookup[key] = [element];
                }
            }
            return lookup;
        }
        finally
        {
            this.Reset();
        }
    },

    ToObject: function(keySelector, elementSelector)
    {
        try
        {
            if (Linq.Utils.IsNull(keySelector, elementSelector)) throw new Error("ToObject")
            keySelector = Linq.Utils.MakeFunction(keySelector);
            elementSelector = Linq.Utils.MakeFunction(elementSelector);

            var obj = {};
            var value;
            while ((value = this.GetValue()) != Linq.Utils.End)
            {
                var key = keySelector(value);
                var element = elementSelector(value);
                obj[key] = element;
            }
            return obj;
        }
        finally
        {
            this.Reset();
        }
    },

    // Overload:function()
    // Overload:function(separator)
    Write: function(separator)
    {
        try
        {
            if (separator == null) separator = ",";
            var value = this.GetValue();
            while (value != Linq.Utils.End)
            {
                document.write(value);
                value = this.GetValue();
                if (value != Linq.Utils.End) document.write(separator);
            }
        }
        finally
        {
            this.Reset();
        }
    },

    WriteLine: function()
    {
        try
        {
            var value = this.GetValue();
            while ((value = this.GetValue()) != Linq.Utils.End)
            {
                document.write(value + "<br />");
            }
        }
        finally
        {
            this.Reset();
        }
    }
}