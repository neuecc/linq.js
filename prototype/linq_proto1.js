/*
linq.js - prototype1
2009/01/23
*/

// Global Object
var Linq = {};

// Wrapper
Linq.Object = function(obj)
{
    this.source = obj;
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

    // Make function from lambda expression
    AnalyzeExpression: function(expression)
    {
        if (typeof expression == "string")
        {
            var expr = expression.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
            expression = new Function(expr[1], "return " + expr[2]);
        }
        return expression;
    }
}

// Generator
Linq.Enumerable =
{
    Range: function(start, count)
    {
        if (Linq.Utils.IsNull(start, count)) throw new Error("Range");

        var array = [];
        for (var i = start; i < start + count; i++)
        {
            array.push(i);
        }
        return new Linq.Object(array);
    },

    Repeat: function(obj, num)
    {
        if (Linq.Utils.IsNull(obj, num)) throw new Error("Repeat");

        var array = [];
        for (var i = 0; i < num; i++)
        {
            array.push(obj);
        }
        return new Linq.Object(array);
    },

    Empty: function()
    {
        var array = [];
        return new Linq.Object(array);
    },

    From: function(obj)
    {
        if (Linq.Utils.IsNull(obj)) throw new Error("From");

        if (typeof obj == "number" || typeof obj == "string")
        {
            return Linq.Enumerable.Repeat(obj, 1);
        }
        if (obj instanceof Array)
        {
            var array = [];
            for (var key in obj)
            {
                if (!(obj[key] instanceof Function))
                {
                    array.push(obj[key]);
                }
            }
            return new Linq.Object(array);
        }
        else // Object or Function
        {
            var array = [];
            for (var key in obj)
            {
                if (!(obj[key] instanceof Function))
                {
                    array.push({ key: key, value: obj[key] });
                }
            }
            return new Linq.Object(array);
        }
    }
}

Linq.Object.prototype =
{
    // Projection and Filtering Methods
    Scan: function(/*variable argument*/)
    {
        if (arguments.length == 0) throw new Error("Scan");
        if (this.source.length == 0) throw new Error("Scan:source contains no elements.");

        var source = this.source;
        var array = [];
        // function(func)
        if (arguments.length == 1)
        {
            var func = arguments[0];
            func = Linq.Utils.AnalyzeExpression(func);
            var value = source[0];
            array.push(value);
            for (var i = 1; i < source.length; i++)
            {
                value = func(value, source[i])
                array.push(value);
            }
            return new Linq.Object(array);
        }
        // function(seed,func)
        // function(seed,func,resultSelector)
        var seed = arguments[0];
        var func = arguments[1];
        var resultSelector = arguments[2];
        func = Linq.Utils.AnalyzeExpression(func);
        resultSelector = Linq.Utils.AnalyzeExpression(resultSelector);
        if (resultSelector == null) resultSelector = function(x) { return x; };
        var value = seed;
        array.push(resultSelector(value));
        for (var i = 0; i < source.length; i++)
        {
            value = func(value, source[i]);
            array.push(resultSelector(value));
        }
        return new Linq.Object(array);
    },

    Select: function(selector)
    {
        if (Linq.Utils.IsNull(selector)) throw new Error("Select")
        selector = Linq.Utils.AnalyzeExpression(selector);

        var array = [];
        var source = this.source;
        for (var i = 0; i < source.length; i++)
        {
            array.push(selector(source[i], i));
        }
        return new Linq.Object(array);
    },

    SelectMany: function(collectionSelector, resultSelector)
    {
        if (Linq.Utils.IsNull(collectionSelector)) throw new Error("SelectMany")
        collectionSelector = Linq.Utils.AnalyzeExpression(collectionSelector);
        resultSelector = Linq.Utils.AnalyzeExpression(resultSelector);

        var array = [];
        var source = this.source;
        for (var i = 0; i < source.length; i++)
        {
            var middleElement = collectionSelector(source[i], i).source;
            for (var j = 0; j < middleElement.length; j++)
            {
                if (resultSelector == null) // case:function(collectionSelector)
                {
                    array.push(middleElement[j]);
                }
                else // case:function(collectionSelector,resultSelector)
                {
                    array.push(resultSelector(source[i], middleElement[j]));
                }
            }
        }
        return new Linq.Object(array);
    },

    Where: function(predicate)
    {
        if (Linq.Utils.IsNull(predicate)) throw new Error("Where")
        predicate = Linq.Utils.AnalyzeExpression(predicate);

        var array = [];
        var source = this.source;
        for (var i = 0; i < source.length; i++)
        {
            if (predicate(source[i], i)) array.push(source[i]);
        }
        return new Linq.Object(array);
    },

    ZipWith: function(second, selector)
    {
        if (Linq.Utils.IsNull(second, selector)) throw new Error("ZipWith")
        selector = Linq.Utils.AnalyzeExpression(selector);

        var outer = this.source;
        var inner = second.source;
        var array = [];
        var index = 0;
        while (outer.length > index && inner.length > index)
        {
            array.push(selector(outer[index], inner[index], index));
            index++;
        }
        return new Linq.Object(array);
    },

    // Join Methods
    Join: function(inner, outerKeySelector, innerKeySelector, resultSelector)
    {
        if (Linq.Utils.IsNull(inner, outerKeySelector, innerKeySelector, resultSelector))
        {
            throw new Error("Join")
        }
        outerKeySelector = Linq.Utils.AnalyzeExpression(outerKeySelector);
        innerKeySelector = Linq.Utils.AnalyzeExpression(innerKeySelector);
        resultSelector = Linq.Utils.AnalyzeExpression(resultSelector);

        var array = [];
        var outer = this.source;
        var inner = inner.source;
        for (var i = 0; i < outer.length; i++)
        {
            for (var j = 0; j < inner.length; j++)
            {
                if (outerKeySelector(outer[i]) == innerKeySelector(inner[j]))
                {
                    array.push(resultSelector(outer[i], inner[j]));
                }
            }
        }
        return new Linq.Object(array);
    },

    GroupJoin: function(inner, outerKeySelector, innerKeySelector, resultSelector)
    {
        if (Linq.Utils.IsNull(inner, outerKeySelector, innerKeySelector, resultSelector))
        {
            throw new Error("GroupJoin")
        }
        outerKeySelector = Linq.Utils.AnalyzeExpression(outerKeySelector);
        innerKeySelector = Linq.Utils.AnalyzeExpression(innerKeySelector);
        resultSelector = Linq.Utils.AnalyzeExpression(resultSelector);

        var lookup = inner.ToLookup(innerKeySelector);
        var array = [];
        var source = this.source;
        for (var i = 0; i < source.length; i++)
        {
            var outer = source[i];
            array.push(resultSelector(outer, lookup[outerKeySelector(outer)]));
        }
        return new Linq.Object(array);
    },

    // Set Methods
    All: function(predicate)
    {
        if (Linq.Utils.IsNull(predicate)) throw new Error("All")
        predicate = Linq.Utils.AnalyzeExpression(predicate);

        var source = this.source;
        for (var i = 0; i < source.length; i++)
        {
            if (!predicate(source[i])) return false;
        }
        return true;
    },

    Any: function(predicate)
    {
        predicate = Linq.Utils.AnalyzeExpression(predicate);

        var source = this.source;
        // case:function()
        if (arguments.length == 0)
        {
            if (source.length == 0) return false;
            else return true;
        }
        // case:function(predicate)
        for (var i = 0; i < source.length; i++)
        {
            if (predicate(source[i])) return true;
        }
        return false;
    },

    Concat: function(second)
    {
        if (Linq.Utils.IsNull(second)) throw new Error("Concat")

        return new Linq.Object(this.source.concat(second.source));
    },

    Contains: function(value)
    {
        if (Linq.Utils.IsNull(value)) throw new Error("Contains")

        var source = this.source;
        for (var i = 0; i < source.length; i++)
        {
            if (source[i] == value) return true;
        }
        return false;
    },

    DefaultIfEmpty: function(defaultValue)
    {
        if (Linq.Utils.IsNull(defaultValue)) throw new Error("DefaultIfEmpty")

        if (this.source.length == 0) return Linq.Enumerable.Make(defaultValue)
        return this;
    },

    Distinct: function()
    {
        var source = this.source;
        var array = [];
        for (var i = 0; i < source.length; i++)
        {
            if (!Linq.Enumerable.From(array).Contains(source[i]))
            {
                array.push(source[i])
            };
        }
        return new Linq.Object(array);
    },

    Except: function(second)
    {
        if (Linq.Utils.IsNull(second)) throw new Error("Except")

        var source = this.source;
        var array = [];
        for (var i = 0; i < source.length; i++)
        {
            if (!second.Contains(source[i])
                && !Linq.Enumerable.From(array).Contains(source[i]))
            {
                array.push(source[i]);
            }
        }
        return new Linq.Object(array);
    },

    Intersect: function(second)
    {
        if (Linq.Utils.IsNull(second)) throw new Error("Intersect")

        var source = this.source;
        var array = [];
        for (var i = 0; i < source.length; i++)
        {
            if (second.Contains(source[i])
                && !Linq.Enumerable.From(array).Contains(source[i]))
            {
                array.push(source[i]);
            }
        }
        return new Linq.Object(array);
    },

    SequenceEqual: function(second)
    {
        if (Linq.Utils.IsNull(second)) throw new Error("SequenceEqual")

        var firstSource = this.source;
        var secondSource = second.source;
        if (firstSource.length != secondSource.length) return false;
        for (var i = 0; i < firstSource.length; i++)
        {
            if (firstSource[i] !== secondSource[i]) return false;
        }
        return true;
    },

    Union: function(second)
    {
        if (Linq.Utils.IsNull(second)) throw new Error("Union")

        return this.Concat(second).Distinct();
    },

    // Ordering Methods
    OrderBy: function(keySelector)
    {
        if (Linq.Utils.IsNull(keySelector)) throw new Error("OrderBy")
        keySelector = Linq.Utils.AnalyzeExpression(keySelector);

        var source = this.source;
        var result = source.sort(function(a, b) { return keySelector(a) - keySelector(b); });
        return new Linq.Object(result);
    },

    OrderByDescending: function(keySelector)
    {
        if (Linq.Utils.IsNull(keySelector)) throw new Error("OrderByDescending")
        keySelector = Linq.Utils.AnalyzeExpression(keySelector);

        var source = this.source;
        var result = source.sort(function(a, b) { return keySelector(b) - keySelector(a); });
        return new Linq.Object(result);
    },

    Reverse: function()
    {
        return new Linq.Object(this.source.reverse());
    },

    Shuffle: function()
    {
        var source = this.source;
        var i = source.length;
        while (i)
        {
            var j = Math.floor(Math.random() * i);
            var t = source[--i];
            source[i] = source[j];
            source[j] = t;
        }
        return this;
    },

    // Grouping Methods
    GroupBy: function(keySelector, elementSelector)
    {
        if (Linq.Utils.IsNull(keySelector)) throw new Error("GroupBy")
        keySelector = Linq.Utils.AnalyzeExpression(keySelector);
        elementSelector = Linq.Utils.AnalyzeExpression(elementSelector);

        var grouping = this.ToLookup(keySelector, elementSelector);
        return Linq.Enumerable.From(grouping);
    },

    // Aggregate Methods
    Aggregate: function(/*variable argument*/)
    {
        if (arguments.length == 0) throw new Error("Aggregate");
        if (this.source.length == 0) throw new Error("Aggregate:source contains no elements.");

        var source = this.source;
        // function(func)
        if (arguments.length == 1)
        {
            var func = arguments[0];
            func = Linq.Utils.AnalyzeExpression(func);
            var value = source[0];
            for (var i = 1; i < source.length; i++)
            {
                value = func(value, source[i])
            }
            return value;
        }
        // function(seed,func)
        // function(seed,func,resultSelector)
        var seed = arguments[0];
        var func = arguments[1];
        var resultSelector = arguments[2];
        func = Linq.Utils.AnalyzeExpression(func);
        resultSelector = Linq.Utils.AnalyzeExpression(resultSelector);
        var value = seed;
        for (var i = 0; i < source.length; i++)
        {
            value = func(value, source[i]);
        }
        if (resultSelector == null) return value; // function(seed,func)
        return resultSelector(value); // function(seed,func,resultSelector)
    },

    Average: function()
    {
        return this.Sum() / this.Count();
    },

    Choice: function()
    {
        var randomNum = Math.floor(Math.random() * this.source.length);
        return this.source[randomNum];
    },

    Count: function()
    {
        return this.source.length;
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
        if (Linq.Utils.IsNull(index)) throw new Error("ElementAt")

        var source = this.source;
        if (index < 0 || index >= source.length)
        {
            throw new Error("ElementAt:index is less than 0 or greater than or equal.");
        }
        return source[index];
    },

    ElementAtOrDefault: function(defaultValue, index)
    {
        if (Linq.Utils.IsNull(defaultValue, index)) throw new Error("ElementAtOrDefault")

        if (index >= this.source.length) return defaultValue;
        else return this.source[index];
    },

    First: function(predicate)
    {
        predicate = Linq.Utils.AnalyzeExpression(predicate);

        var source = this.source;
        if (source.length == 0) throw new Error("First:sequence is empty");
        // case:function()
        if (predicate == null) return source[0];
        // case:function(predicate)
        for (var i = 0; i < source.length; i++)
        {
            if (predicate(source[i])) return source[i];
        }
    },

    FirstOrDefault: function(defaultValue, predicate)
    {
        if (Linq.Utils.IsNull(defaultValue)) throw new Error("FirstOrDefault");
        predicate = Linq.Utils.AnalyzeExpression(predicate);

        if (this.source.length == 0) return defaultValue;
        if (predicate == null) return this.source[0];
        var value = this.First(predicate);
        return (value == null) ? defaultValue : value;
    },

    Last: function(predicate)
    {
        predicate = Linq.Utils.AnalyzeExpression(predicate);

        var source = this.source;
        if (source.length == 0) throw new Error("Last:sequence is empty");
        // case:function()
        if (predicate == null) return source[source.length - 1];
        // case:function(predicate)
        var temp;
        for (var i = 0; i < source.length; i++)
        {
            if (predicate(source[i])) temp = source[i];
        }
        return temp;
    },

    LastOrDefault: function(defaultValue, predicate)
    {
        if (Linq.Utils.IsNull(predicate, defaultValue)) throw new Error("LastOrDefault");
        predicate = Linq.Utils.AnalyzeExpression(predicate);

        var source = this.source;
        if (source.length == 0) return defaultValue;
        if (predicate == null)
        {
            return (this.source.length == 0) ? defaultValue : source[source.length - 1];
        }
        var value = this.Last(predicate);
        return (value == null) ? defaultValue : value;
    },

    Single: function(predicate)
    {
        predicate = Linq.Utils.AnalyzeExpression(predicate);

        var source = this.source;
        if (source.length == 0) throw new Error("Single:sequence is empty");
        // case:function()
        if (predicate == null)
        {
            if (source.length == 1)
            {
                return source[0];
            }
            else
            {
                throw new Error("Single:sequence contains more than one element.");
            }
        }
        // case:function(predicate)
        var temp;
        for (var i = 0; i < source.length; i++)
        {
            if (predicate(source[i]))
            {
                if (temp == null)
                {
                    temp = source[i];
                }
                else
                {
                    throw new Error("Single:sequence contains more than one element.");
                }
            }
        }
        return temp;
    },

    Skip: function(count)
    {
        if (Linq.Utils.IsNull(count)) throw new Error("Skip");

        var source = this.source;
        var array = [];
        for (var i = count; i < source.length; i++)
        {
            array.push(source[i]);
        }
        return new Linq.Object(array);
    },

    SkipWhile: function(predicate)
    {
        if (Linq.Utils.IsNull(predicate)) throw new Error("SkipWhile");
        predicate = Linq.Utils.AnalyzeExpression(predicate);

        var source = this.source;
        var array = [];
        for (var i = 0; i < source.length; i++)
        {
            if (predicate(source[i], i)) continue;
            array.push(source[i]);
        }
        return new Linq.Object(array);
    },

    Take: function(count)
    {
        if (Linq.Utils.IsNull(count)) throw new Error("Take");

        var source = this.source;
        var array = [];
        for (var i = 0; i < count; i++)
        {
            array.push(source[i]);
        }
        return new Linq.Object(array);
    },

    TakeWhile: function(predicate)
    {
        if (Linq.Utils.IsNull(predicate)) throw new Error("TakeWhile");
        predicate = Linq.Utils.AnalyzeExpression(predicate);

        var source = this.source;
        var array = [];
        for (var i = 0; i < source.length; i++)
        {
            if (!predicate(source[i], i)) break;
            array.push(source[i]);
        }
        return new Linq.Object(array);
    },

    // Convert Methods
    ToArray: function()
    {
        return this.source;
    },

    ToLookup: function(keySelector, elementSelector)
    {
        if (Linq.Utils.IsNull(keySelector)) throw new Error("ToLookup")
        keySelector = Linq.Utils.AnalyzeExpression(keySelector);
        elementSelector = Linq.Utils.AnalyzeExpression(elementSelector);

        var source = this.source;
        if (elementSelector == null) elementSelector = function(x) { return x };
        var lookup = {};
        for (var i = 0; i < source.length; i++)
        {
            var key = keySelector(source[i]);
            var element = elementSelector(source[i]);
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
    },

    ToObject: function(keySelector, elementSelector)
    {
        if (Linq.Utils.IsNull(keySelector, elementSelector)) throw new Error("ToObject")
        keySelector = Linq.Utils.AnalyzeExpression(keySelector);
        elementSelector = Linq.Utils.AnalyzeExpression(elementSelector);

        var obj = {};
        var source = this.source;
        for (var i = 0; i < source.length; i++)
        {
            var key = keySelector(source[i]);
            var element = elementSelector(source[i]);
            obj[key] = element;
        }
        return obj;
    },

    // Action Methods
    ForEach: function(action)
    {
        if (Linq.Utils.IsNull(action)) throw new Error("ForEach")
        action = Linq.Utils.AnalyzeExpression(action);

        var source = this.source;
        for (var i = 0; i < source.length; i++)
        {
            action(source[i], i);
        }
    },

    Write: function()
    {
        var source = this.source;
        for (var i = 0; i < source.length; i++)
        {
            document.write(source[i]);
        }
    },

    WriteLine: function()
    {
        var source = this.source;
        for (var i = 0; i < source.length; i++)
        {
            document.writeln(source[i] + "<br />");
        }
    }
}