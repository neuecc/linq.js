if (typeof Linq == "undefined") Linq = {};
Linq.Object = {};

Linq.Enumerable = E =
{
    Choice: function(Params_Contents)
    {
        /// <summary>Random choice from arguments.
        /// Ex: Choice(1,2,3) - 1,3,2,3,3,2,1...</summary>
        /// <param type="T" name="Params_Contents" parameterArray="true">Array or Params Contents</param>
        /// <returns type="Linq.Object"></returns>
    },

    Cycle: function(Params_Contents)
    {
        /// <summary>Cycle Repeat from arguments.
        /// Ex: Cycle(1,2,3) - 1,2,3,1,2,3,1,2,3...</summary>
        /// <param type="T" name="Params_Contents" parameterArray="true">Array or Params Contents</param>
        /// <returns type="Linq.Object"></returns>
    },

    Empty: function()
    {
        /// <summary>Returns an empty Linq.Object.</summary>
        /// <returns type="Linq.Object"></returns>
    },

    From: function(obj)
    {
        /// <summary>
        /// Make Linq.Object from obj.
        /// 1. null = Linq.Enumerable.Empty().
        /// 2. Linq.Object = Linq.Object.
        /// 3. Number = Linq.Enumerable.Repeat(obj, 1)
        /// 4. String = ToCharArray.(Ex:"abc" => "a","b","c")
        /// 5. Object = ToKeyValuePair.(Ex:"{a:0}" => .Key=a, .Value=0)
        /// 6. Array or ArrayLikeObject(has length)
        /// </summary>
        /// <param name="obj">objects</param>
        /// <returns type="Linq.Object"></returns>
    },
    
    Make:function(element)
    {
        /// <summary>Make one sequence. This equals Repeat(element, 1)</summary>
        /// <param name="element">element</param>
        /// <returns type="Linq.Object"></returns>
    },

    Matches: function(input, pattern, flags)
    {
        /// <summary>Global regex match and send regexp object.
        /// Ex: Matches((.)z,"0z1z2z") - $[1] => 0,1,2</summary>
        /// <param type="String" name="input">input string</param>
        /// <param type="RegExp/String" name="pattern">RegExp or Pattern string</param>
        /// <param type="Optional:String" name="flags" optional="true">If pattern is String then can use regexp flags "i" or "m" or "im"</param>
        /// <returns type="Linq.Object"></returns>
    },

    Range: function(start, count, step)
    {
        /// <summary>Generates a sequence of integral numbers within a specified range.
        /// Ex: Range(1,5) - 1,2,3,4,5</summary>
        /// <param type="Number" integer="true" name="start">The value of the first integer in the sequence.</param>
        /// <param type="Number" integer="true" name="count">The number of sequential integers to generate.</param>
        /// <param type="Optional:Number" integer="true" name="step" optional="true">Step of generate number.(Ex:Range(0,3,5) - 0,5,10)</param>
        /// <returns type="Linq.Object"></returns>
    },

    RangeDown: function(start, count, step)
    {
        /// <summary>Generates a sequence of integral numbers within a specified range.
        /// Ex: RangeDown(5,5) - 5,4,3,2,1</summary>
        /// <param type="Number" integer="true" name="start">The value of the first integer in the sequence.</param>
        /// <param type="Number" integer="true" name="count">The number of sequential integers to generate.</param>
        /// <param type="Optional:Number" integer="true" name="step" optional="true">Step of generate number.(Ex:RangeDown(0,3,5) - 0,-5,-10)</param>
        /// <returns type="Linq.Object"></returns>
    },

    RangeTo: function(start, to, step)
    {
        /// <summary>Generates a sequence of integral numbers.
        /// Ex: RangeTo(10,15) - 10,11,12,13,14,15</summary>
        /// <param type="Number" integer="true" name="start">start integer</param>
        /// <param type="Number" integer="true" name="to">to integer</param>
        /// <param type="Optional:Number" integer="true" name="step" optional="true">Step of generate number.(Ex:RangeTo(0,7,3) - 0,3,6)</param>
        /// <returns type="Linq.Object"></returns>
    },

    RangeDownTo: function(start, to, step)
    {
        /// <summary>Generates a sequence of integral numbers.
        /// Ex: RangeDownTo(10,5) - 10,9,8,7,6,5</summary>
        /// <param type="Number" integer="true" name="start">start integer</param>
        /// <param type="Number" integer="true" name="to">to integer</param>
        /// <param type="Optional:Number" integer="true" name="step" optional="true">Step of generate number.(Ex:RangeDownTo(10,2,3) - 10,7,4)</param>
        /// <returns type="Linq.Object"></returns>
    },

    Repeat: function(obj, count)
    {
        /// <summary>Generates a sequence that contains one repeated value.
        /// If omit count then generate to infinity.
        /// Ex: Repeat("foo",3) - "foo","foo","foo"</summary>
        /// <param type="TResult" name="obj">The value to be repeated.</param>
        /// <param type="Optional:Number" integer="true" name="count" optional="true">The number of times to repeat the value in the generated sequence.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Times: function(func, count)
    {
        /// <summary>Generates a sequence that execute func value.
        /// If omit count then generate to infinity.
        /// Ex: Times("Math.random()", 5) - 0.131341,0.95425252,...</summary>
        /// <param type="Func&lt;T>" name="func">The value of execute func to be repeated.</param>
        /// <param type="Optional:Number" integer="true" name="count" optional="true">The number of times to repeat the value in the generated sequence.</param>
        /// <returns type="Linq.Object"></returns>
    },

    ToInfinity: function(start, step)
    {
        /// <summary>Generates a sequence of integral numbers to infinity.
        /// Ex: ToInfinity() - 0,1,2,3...</summary>
        /// <param type="Optional:Number" integer="true" name="start" optional="true">start integer</param>
        /// <param type="Optional:Number" integer="true" name="step" optional="true">Step of generate number.(Ex:ToInfinity(10,3) - 10,13,16,19,...)</param>
        /// <returns type="Linq.Object"></returns>
    },

    ToNegativeInfinity: function(start, step)
    {
        /// <summary>Generates a sequence of integral numbers to negative infinity.
        /// Ex: ToNegativeInfinity() - 0,-1,-2,-3...</summary>
        /// <param type="Optional:Number" integer="true" name="start" optional="true">start integer</param>
        /// <param type="Optional:Number" integer="true" name="step" optional="true">Step of generate number.(Ex:ToNegativeInfinity(10,3) - 10,7,4,1,...)</param>
        /// <returns type="Linq.Object"></returns>
    },

    Unfold: function(seed, func)
    {
        /// <summary>Applies function and generates a infinity sequence.
        /// Ex: Unfold(3,"$+10") - 3,13,23,...</summary>
        /// <param type="T" name="seed">The initial accumulator value.</param>
        /// <param type="Func&lt;T,T>" name="func">An accumulator function to be invoked on each element.</param>
        /// <returns type="Linq.Object"></returns>
    }
}

Linq.Object.prototype =
{
    /* Projection and Filtering Methods */

    CascadeBreadthFirst: function(func, resultSelector)
    {
        /// <summary>Projects each element of sequence and flattens the resulting sequences into one sequence use breadth first search.</summary>
        /// <param name="func" type="Func&lt;T,T[]>">Select child sequence.</param>
        /// <param name="resultSelector" type="Optional:Func&lt;T>_or_Func&lt;T,int>" optional="true">Optional:the second parameter of the function represents the nestlevel of the source sequence.</param>
        /// <returns type="Linq.Object"></returns>
    },

    CascadeDepthFirst: function(func, resultSelector)
    {
        /// <summary>Projects each element of sequence and flattens the resulting sequences into one sequence use depth first search.</summary>
        /// <param name="func" type="Func&lt;T,T[]>">Select child sequence.</param>
        /// <param name="resultSelector" type="Optional:Func&lt;T>_or_Func&lt;T,int>" optional="true">Optional:the second parameter of the function represents the nestlevel of the source sequence.</param>
        /// <returns type="Linq.Object"></returns>
    },
    
    Flatten: function()
    {
        /// <summary>Flatten sequences into one sequence.</summary>
        /// <returns type="Linq.Object"></returns>
    },

    Pairwise: function(selector)
    {
        /// <summary>Projects current and next element of a sequence into a new form.</summary>
        /// <param type="Func&lt;TSource,TSource,TResult>" name="selector">A transform function to apply to current and next element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Scan: function(func_or_seed, func, resultSelector)
    {
        /// <summary>Applies an accumulator function over a sequence.</summary>
        /// <param name="func_or_seed" type="Func&lt;T,T,T>_or_TAccumulate">Func is an accumulator function to be invoked on each element. Seed is the initial accumulator value.</param>
        /// <param name="func" type="Optional:Func&lt;TAccumulate,T,TAccumulate>" optional="true">An accumulator function to be invoked on each element.</param>
        /// <param name="resultSelector" type="Optional:Func&lt;TAccumulate,TResult>" optional="true">A function to transform the final accumulator value into the result value.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Select: function(selector)
    {
        /// <summary>Projects each element of a sequence into a new form.</summary>
        /// <param name="selector" type="Func&lt;T,T>_or_Func&lt;T,int,T>">A transform function to apply to each source element; Optional:the second parameter of the function represents the index of the source element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    SelectMany: function(collectionSelector, resultSelector)
    {
        /// <summary>Projects each element of a sequence and flattens the resulting sequences into one sequence.</summary>
        /// <param name="collectionSelector" type="Func&lt;T,TCollection[]>_or_Func&lt;T,int,TCollection[]>">A transform function to apply to each source element; Optional:the second parameter of the function represents the index of the source element.</param>
        /// <param name="resultSelector" type="Optional:Func&lt;T,TCollection,TResult>" optional="true">Optional:A transform function to apply to each element of the intermediate sequence.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Slice: function(size)
    {
        /// <summary>Divide by size</summary>
        /// <param name="size" type="Number" integer="true">integer</param>
        /// <returns type="Linq.Object"></returns>
    },

    Where: function(predicate)
    {
        /// <summary>Filters a sequence of values based on a predicate.</summary>
        /// <param name="predicate" type="Func&lt;T,bool>_or_Func&lt;T,int,bool>">A function to test each source element for a condition; Optional:the second parameter of the function represents the index of the source element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    ZipWith: function(second, selector)
    {
        /// <summary>Ex: E.From([1,2,3]).ZipWith([4,5,6],"a,b=>a+b") -> 5,7,9</summary>
        /// <param name="second" type="T[]">Merge with the first sequence.</param>
        /// <param name="selector" type="Func&lt;TFirst,TSecond,TResult>_or_Func&lt;TFirst,TSecond,int,TResult>">A transform function to apply source element; Optional:the third parameter of the function represents the index of the source element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    /* Join Methods */

    Join: function(inner, outerKeySelector, innerKeySelector, resultSelector)
    {
        /// <summary>Correlates the elements of two sequences based on matching keys.</summary>
        /// <param name="inner" type="T[]">The sequence to join to the first sequence.</param>
        /// <param name="outerKeySelector" type="Func&lt;TOuter,TKey>">A function to extract the join key from each element of the first sequence.</param>
        /// <param name="innerKeySelector" type="Func&lt;TInner,TKey>">A function to extract the join key from each element of the second sequence.</param>
        /// <param name="resultSelector" type="Func&lt;TOuter,TInner,TResult>">A function to create a result element from two matching elements.</param>
        /// <returns type="Linq.Object"></returns>
    },

    GroupJoin: function(inner, outerKeySelector, innerKeySelector, resultSelector)
    {
        /// <summary>Correlates the elements of two sequences based on equality of keys and groups the results.</summary>
        /// <param name="inner" type="T[]">The sequence to join to the first sequence.</param>
        /// <param name="outerKeySelector" type="Func&lt;TOuter>">A function to extract the join key from each element of the first sequence.</param>
        /// <param name="innerKeySelector" type="Func&lt;TInner>">A function to extract the join key from each element of the second sequence.</param>
        /// <param name="resultSelector" type="Func&lt;TOuter,TInner[],TResult">A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.</param>
        /// <returns type="Linq.Object"></returns>
    },

    /* Set Methods */

    All: function(predicate)
    {
        /// <summary>Determines whether all elements of a sequence satisfy a condition.</summary>
        /// <param type="Func&lt;T,bool>" name="predicate">A function to test each element for a condition.</param>
        /// <returns type="Boolean"></returns>
    },

    Any: function(predicate)
    {
        /// <summary>Determines whether a sequence contains any elements or any element of a sequence satisfies a condition.</summary>
        /// <param name="predicate" type="Optional:Func&lt;T,bool>" optional="true">A function to test each element for a condition.</param>
        /// <returns type="Boolean"></returns>
    },

    Concat: function(second)
    {
        /// <summary>Concatenates two sequences.</summary>
        /// <param name="second" type="T[]">The sequence to concatenate to the first sequence.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Insert: function(index, second)
    {
        /// <summary>Merge two sequences.</summary>
        /// <param name="index" type="Number" integer="true">The index of insert start position.</param>
        /// <param name="second" type="T[]">The sequence to concatenate to the first sequence.</param>
        /// <returns type="Linq.Object"></returns>
    },

    // Overload:function(value)
    // Overload:function(value, compareSelector)
    Contains: function(value, compareSelector)
    {
        /// <summary>Determines whether a sequence contains a specified element.</summary>
        /// <param name="value" type="T">The value to locate in the sequence.</param>
        /// <param name="compareSelector" type="Optional:Func&lt;T,TKey>" optional="true">An equality comparer to compare values.</param>
        /// <returns type="Boolean"></returns>
    },

    DefaultIfEmpty: function(defaultValue)
    {
        /// <summary>Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.</summary>
        /// <param name="defaultValue" type="T">The value to return if the sequence is empty.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Distinct: function(compareSelector)
    {
        /// <summary>Returns distinct elements from a sequence.</summary>
        /// <param name="compareSelector" type="Optional:Func&lt;T,TKey>" optional="true">An equality comparer to compare values.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Except: function(second, compareSelector)
    {
        /// <summary>Produces the set difference of two sequences.</summary>
        /// <param name="second" type="T[]">An T[] whose Elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.</param>
        /// <param name="compareSelector" type="Optional:Func&lt;T,TKey>" optional="true">An equality comparer to compare values.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Intersect: function(second, compareSelector)
    {
        /// <summary>Produces the set difference of two sequences.</summary>
        /// <param name="second" type="T[]">An T[] whose distinct elements that also appear in the first sequence will be returned.</param>
        /// <param name="compareSelector" type="Optional:Func&lt;T,TKey>" optional="true">An equality comparer to compare values.</param>
        /// <returns type="Linq.Object"></returns>
    },

    SequenceEqual: function(second, compareSelector)
    {
        /// <summary>Determines whether two sequences are equal by comparing the elements.</summary>
        /// <param name="second" type="T[]">An T[] to compare to the first sequence.</param>
        /// <param name="compareSelector" type="Optional:Func&lt;T,TKey>" optional="true">An equality comparer to compare values.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Union: function(second, compareSelector)
    {
        /// <summary>Produces the union of two sequences.</summary>
        /// <param name="second" type="T[]">An T[] whose distinct elements form the second set for the union.</param>
        /// <param name="compareSelector" type="Optional:Func&lt;T,TKey>" optional="true">An equality comparer to compare values.</param>
        /// <returns type="Linq.Object"></returns>
    },

    /* Ordering Methods */

    OrderBy: function(keySelector)
    {
        /// <summary>Sorts the elements of a sequence in ascending order according to a key.</summary>
        /// <param name="keySelector" type="Func&lt;T,TKey>">A function to extract a key from an element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    OrderByDescending: function(keySelector)
    {
        /// <summary>Sorts the elements of a sequence in descending order according to a key.</summary>
        /// <param name="keySelector" type="Func&lt;T,TKey>">A function to extract a key from an element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    ThenBy: function(keySelector)
    {
        /// <summary>Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.</summary>
        /// <param name="keySelector" type="Func&lt;T,TKey>">A function to extract a key from each element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    ThenByDescending: function(keySelector)
    {
        /// <summary>Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.</summary>
        /// <param name="keySelector" type="Func&lt;T,TKey>">A function to extract a key from each element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Reverse: function()
    {
        /// <summary>Inverts the order of the elements in a sequence.</summary>
        /// <returns type="Linq.Object"></returns>
    },

    Shuffle: function()
    {
        /// <summary>Shuffle sequence.</summary>
        /// <returns type="Linq.Object"></returns>
    },

    /* Grouping Methods */

    GroupBy: function(keySelector, elementSelector, resultSelector)
    {
        /// <summary>Groups the elements of a sequence according to a specified key selector function.</summary>
        /// <param name="keySelector" type="Func&lt;T,TKey>">A function to extract the key for each element.</param>
        /// <param name="elementSelector" type="Optional:Func&lt;T,TElement>">A function to map each source element to an element in an Grouping&lt;TKey, TElement>.</param>
        /// <param name="resultSelector" type="Optional:Func&lt;TKey,TElement[],TResult>">A function to create a result value from each group.</param>
        /// <returns type="Linq.Object"></returns>
    },

    /* Aggregate Methods */

    Aggregate: function(func_or_seed, func, resultSelector)
    {
        /// <summary>Applies an accumulator function over a sequence.</summary>
        /// <param name="func_or_seed" type="Func&lt;T,T,T>_or_TAccumulate">Func is an accumulator function to be invoked on each element. Seed is the initial accumulator value.</param>
        /// <param name="func" type="Optional:Func&lt;TAccumulate,T,TAccumulate>" optional="true">An accumulator function to be invoked on each element.</param>
        /// <param name="resultSelector" type="Optional:Func&lt;TAccumulate,TResult>" optional="true">A function to transform the final accumulator value into the result value.</param>
        /// <returns type="TResult"></returns>
    },

    Average: function(selector)
    {
        /// <summary>Computes the average of a sequence.</summary>
        /// <param name="selector" type="Optional:Func&lt;T,Number>" optional="true">A transform function to apply to each element.</param>
        /// <returns type="Number"></returns>
    },

    Count: function(predicate)
    {
        /// <summary>Returns the number of elements in a sequence.</summary>
        /// <param name="predicate" type="Optional:Func&lt;T,Boolean>" optional="true">A function to test each element for a condition.</param>
        /// <returns type="Number"></returns>
    },

    Max: function(selector)
    {
        /// <summary>Returns the maximum value in a sequence</summary>
        /// <param name="selector" type="Optional:Func&lt;T,TKey>" optional="true">A transform function to apply to each element.</param>
        /// <returns type="Number"></returns>
    },

    Min: function(selector)
    {
        /// <summary>Returns the minimum value in a sequence</summary>
        /// <param name="selector" type="Optional:Func&lt;T,TKey>" optional="true">A transform function to apply to each element.</param>
        /// <returns type="Number"></returns>
    },

    Sum: function(selector)
    {
        /// <summary>Computes the sum of a sequence of values.</summary>
        /// <param name="selector" type="Optional:Func&lt;T,TKey>" optional="true">A transform function to apply to each element.</param>
        /// <returns type="Number"></returns>
    },

    /* Paging Methods */

    ElementAt: function(index)
    {
        /// <summary>Returns the element at a specified index in a sequence.</summary>
        /// <param name="index" type="Number" integer="true">The zero-based index of the element to retrieve.</param>
        /// <returns type="T"></returns>
    },

    ElementAtOrDefault: function(index, defaultValue)
    {
        /// <summary>Returns the element at a specified index in a sequence or a default value if the index is out of range.</summary>
        /// <param name="index" type="Number" integer="true">The zero-based index of the element to retrieve.</param>
        /// <param name="defaultValue" type="T">The value if the index is outside the bounds then send.</param>
        /// <returns type="T"></returns>
    },

    First: function(predicate)
    {
        /// <summary>Returns the first element of a sequence.</summary>
        /// <param name="predicate" type="Optional:Func&lt;T,Boolean>">A function to test each element for a condition.</param>
        /// <returns type="T"></returns>
    },

    FirstOrDefault: function(defaultValue, predicate)
    {
        /// <summary>Returns the first element of a sequence, or a default value.</summary>
        /// <param name="defaultValue" type="T">The value if not found then send.</param>
        /// <param name="predicate" type="Optional:Func&lt;T,Boolean>">A function to test each element for a condition.</param>        
        /// <returns type="T"></returns>
    },

    Last: function(predicate)
    {
        /// <summary>Returns the last element of a sequence.</summary>
        /// <param name="predicate" type="Optional:Func&lt;T,Boolean>">A function to test each element for a condition.</param>
        /// <returns type="T"></returns>
    },

    LastOrDefault: function(defaultValue, predicate)
    {
        /// <summary>Returns the last element of a sequence, or a default value.</summary>
        /// <param name="defaultValue" type="T">The value if not found then send.</param>
        /// <param name="predicate" type="Optional:Func&lt;T,Boolean>">A function to test each element for a condition.</param>        
        /// <returns type="T"></returns>
    },

    Single: function(predicate)
    {
        /// <summary>Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.</summary>
        /// <param name="predicate" type="Optional:Func&lt;T,Boolean>">A function to test each element for a condition.</param>
        /// <returns type="T"></returns>
    },

    SingleOrDefault: function(defaultValue, predicate)
    {
        /// <summary>Returns a single, specific element of a sequence of values, or a default value if no such element is found.</summary>
        /// <param name="defaultValue" type="T">The value if not found then send.</param>
        /// <param name="predicate" type="Optional:Func&lt;T,Boolean>">A function to test each element for a condition.</param>        
        /// <returns type="T"></returns>
    },

    Skip: function(count)
    {
        /// <summary>Bypasses a specified number of elements in a sequence and then returns the remaining elements.</summary>
        /// <param name="count" type="Number" integer="true">The number of elements to skip before returning the remaining elements.</param>
        /// <returns type="Linq.Object"></returns>
    },

    SkipWhile: function(predicate)
    {
        /// <summary>Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.</summary>
        /// <param name="predicate" type="Func&lt;T,Boolean>_or_Func&lt;T,int,Boolean>">A function to test each source element for a condition; Optional:the second parameter of the function represents the index of the source element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    Take: function(count)
    {
        /// <summary>Returns a specified number of contiguous elements from the start of a sequence.</summary>
        /// <param name="count" type="Number" integer="true">The number of elements to return.</param>
        /// <returns type="Linq.Object"></returns>
    },

    TakeWhile: function(predicate)
    {
        /// <summary>Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.</summary>
        /// <param name="predicate" type="Func&lt;T,Boolean>_or_Func&lt;T,int,Boolean>">A function to test each source element for a condition; Optional:the second parameter of the function represents the index of the source element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    IndexOf: function(item)
    {
        /// <summary>Returns the zero-based index of the flrst occurrence of a value.</summary>
        /// <param name="item" type="T">The zero-based starting index of the search.</param>
        /// <returns type="Number" integer="true"></returns>
    },

    LastIndexOf: function(item)
    {
        /// <summary>Returns the zero-based index of the last occurrence of a value.</summary>
        /// <param name="item" type="T">The zero-based starting index of the search.</param>
        /// <returns type="Number" integer="true"></returns>
    },

    /* Convert Methods */

    ToArray: function()
    {
        /// <summary>Creates an array from this sequence.</summary>
        /// <returns type="Array"></returns>
    },

    ToJSON: function()
    {
        /// <summary>Creates JSON string from this sequence.</summary>
        /// <returns type="String"></returns>
    },

    ToLookup: function(keySelector, elementSelector)
    {
        /// <summary>Creates a Lookup([][]) from this sequence.</summary>
        /// <param name="keySelector" type="Func&lt;T,TKey>">A function to extract a key from each element.</param>
        /// <param name="elementSelector" type="Optional:Func&lt;T,TElement>">A transform function to produce a result element value from each element.</param>
        /// <returns type="Array"></returns>
    },

    ToObject: function(keySelector, elementSelector)
    {
        /// <summary>Creates a Object from this sequence.</summary>
        /// <param name="keySelector" type="Func&lt;T,TKey>">A function to extract a key from each element.</param>
        /// <param name="elementSelector" type="Func&lt;T,TElement>">A transform function to produce a result element value from each element.</param>
        /// <returns type="Object"></returns>
    },

    // Overload:function()
    // Overload:function(separator)
    // Overload:function(separator,selector)
    ToString: function(separator, selector)
    {
        /// <summary>Creates Joined string from this sequence.</summary>
        /// <param name="separator" type="Optional:String">A String.</param>
        /// <param name="selector" type="Optional:Func&lt;T,String>">A transform function to apply to each source element.</param>
        /// <returns type="String"></returns>
    },

    ToTable: function(Params_Selectors)
    {
        /// <summary>Creates Table HTML string from this sequence.</summary>
        /// <param name="Params_Selectors" type="Optional:Func&lt;T,String>" parameterArray="true">Selector to TD element.</param>
        /// <returns type="String"></returns>
    },

    /* Action Methods */

    Do: function(action)
    {
        /// <summary>Performs the specified action on each element of the sequence.</summary>
        /// <param name="action" type="Action&lt;T>_or_Action&lt;T,int>">Optional:the second parameter of the function represents the index of the source element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    ForEach: function(action)
    {
        /// <summary>Performs the specified action on each element of the sequence.</summary>
        /// <param name="action" type="Action&lt;T>_or_Action&lt;T,int>">[return true;]continue iteration.[return false;]break iteration. Optional:the second parameter of the function represents the index of the source element.</param>
        /// <returns type="void"></returns>
    },

    Write: function(separator, selector)
    {
        /// <summary>Do document.write.</summary>
        /// <param name="separator" type="Optional:String">A String.</param>
        /// <param name="selector" type="Optional:Func&lt;T,String>">A transform function to apply to each source element.</param>
        /// <returns type="void"></returns>
    },

    WriteLine: function(selector)
    {
        /// <summary>Do document.write + &lt;br />.</summary>
        /// <param name="selector" type="Optional:Func&lt;T,String>">A transform function to apply to each source element.</param>
        /// <returns type="void"></returns>
    },

    /* For Debug Methods */

    Force: function()
    {
        /// <summary>Execute enumerate.</summary>
        /// <returns type="void"></returns>
    },
    
    Trace: function(message, selector)
    {
        /// <summary>Trace object use document.write + &lt;br>.</summary>
        /// <param name="message" type="Optional:String">Default is 'Trace:'.</param>
        /// <param name="selector" type="Optional:Func&lt;T,String>">A transform function to apply to each source element.</param>
        /// <returns type="Linq.Object"></returns>
    },

    TraceF: function(message, selector)
    {
        /// <summary>Trace object use Firebug's console.log.</summary>
        /// <param name="message" type="Optional:String">Default is 'Trace:'.</param>
        /// <param name="selector" type="Optional:Func&lt;T,String>">A transform function to apply to each source element.</param>
        /// <returns type="Linq.Object"></returns>
    }
}