/*--------------------------------------------------------------------------
* linq.js - LINQ for JavaScript Library
* ver 1.3.0.2 (Jun. 15th, 2009)
*
* created and maintained by neuecc <ils@neue.cc>
* licensed under Microsoft Public License(Ms-PL)
* http://neue.cc/
* http://linqjs.codeplex.com/
*--------------------------------------------------------------------------*/

// Namespace
if (typeof Linq == "undefined") Linq = {};

// Utility Methods
Linq.Utils =
{
    // Create anonymous function from lambda expression
    CreateFunctor: function(expression)
    {
        if (typeof expression == "string")
        {
            if (expression == "")
            {
                return function(x) { return x; }
            }
            else if (expression.indexOf("=>") == -1)
            {
                return new Function("$", "return " + expression);
            }
            else
            {
                var expr = expression.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
                return new Function(expr[1], "return " + expr[2]);
            }
        }
        return expression;
    },

    // Overload:function()
    // Overload:function(linqObject, compareSelector)
    CreateHashSet: function(linqObject, compareSelector)
    {
        var hashSet = new Linq.HashSet();
        if (linqObject != null) linqObject.ForEach(function(x) { hashSet.Add(compareSelector(x)); });
        return hashSet;
    },

    IsIEnumerable: function(obj)
    {
        if (typeof Enumerator != "undefined")
        {
            try
            {
                new Enumerator(obj);
                return true;
            }
            catch (e) { }
        }
        return false;
    }
}

// Enumerable Object
Linq.Object = function(getEnumerator)
{
    this.GetEnumerator = getEnumerator;
}

// Enumerator
Linq.Enumerator = function(moveNext)
{
    this.Current = null;
    this.MoveNext = moveNext;
}

// Generator : E is Shortcut Symbol of Linq.Enumerable
Linq.Enumerable = E =
{
    Choice: function() // variable argument
    {
        var args;
        if (arguments[0] instanceof Array) args = arguments[0];
        else args = arguments;

        return new Linq.Object(function()
        {
            return new Linq.Enumerator(function()
            {
                this.Current = args[Math.floor(Math.random() * args.length)];
                return true;
            });
        });
    },

    Cycle: function() // variable argument
    {
        var args;
        if (arguments[0] instanceof Array) args = arguments[0];
        else args = arguments;

        return new Linq.Object(function()
        {
            var index = 0;
            return new Linq.Enumerator(function()
            {
                if (index >= args.length) index = 0;
                this.Current = args[index++];
                return true;
            });
        });
    },

    Empty: function()
    {
        return new Linq.Object(function()
        {
            return new Linq.Enumerator(function()
            {
                return false;
            });
        });
    },

    From: function(obj)
    {
        if (obj == null)
        {
            return Linq.Enumerable.Empty();
        }
        if (obj instanceof Linq.Object)
        {
            return obj;
        }
        if (typeof obj == "number")
        {
            return Linq.Enumerable.Repeat(obj, 1);
        }
        if (typeof obj == "string")
        {
            return new Linq.Object(function()
            {
                var index = 0;
                return new Linq.Enumerator(function()
                {
                    if (index < obj.length)
                    {
                        this.Current = obj.charAt(index++);
                        return true;
                    }
                    return false;
                });
            });
        }
        if (Linq.Utils.IsIEnumerable(obj))
        {
            return new Linq.Object(function()
            {
                var enumerator = new Enumerator(obj);
                var isFirst = true;
                return new Linq.Enumerator(function()
                {
                    if (isFirst) isFirst = false;
                    else enumerator.moveNext();
                    if (!enumerator.atEnd())
                    {
                        this.Current = enumerator.item();
                        return true;
                    }
                    return false;
                });
            });
        }
        // not array or array like object
        if (typeof obj.length != "number")
        {
            var array = [];
            for (var key in obj)
            {
                if (!(obj[key] instanceof Function))
                {
                    array.push({ Key: key, Value: obj[key] });
                }
            }
            obj = array; // Create Array
        }

        return new Linq.Object(function()
        {
            var index = 0;
            return new Linq.Enumerator(function()
            {
                while (index < obj.length)
                {
                    if (!(obj[index] instanceof Function))
                    {
                        this.Current = obj[index++];
                        return true;
                    }
                    index++;
                }
                return false;
            });
        });
    },

    Make: function(element)
    {
        return Linq.Enumerable.Repeat(element, 1);
    },

    // Overload:function(input, pattern)
    // Overload:function(input, pattern, flags)
    Matches: function(input, pattern, flags)
    {
        if (flags == null) flags = "";
        if (pattern instanceof RegExp)
        {
            flags += (pattern.ignoreCase) ? "i" : "";
            flags += (pattern.multiline) ? "m" : "";
            pattern = pattern.source;
        }
        if (flags.indexOf("g") === -1) flags += "g";

        return new Linq.Object(function()
        {
            var regex = new RegExp(pattern, flags);

            return new Linq.Enumerator(function()
            {
                var match = regex.exec(input);
                if (match)
                {
                    this.Current = match;
                    return true;
                }
                return false;
            });
        });
    },

    // Overload:function(start, count)
    // Overload:function(start, count, step)
    Range: function(start, count, step)
    {
        if (step == null) step = 1;

        return new Linq.Object(function()
        {
            return new Linq.Enumerator(function()
            {
                if (this.Current == null) this.Current = start - step;
                if (start + count * step > this.Current + step)
                {
                    this.Current += step;
                    return true;
                }
                return false;
            });
        });
    },

    // Overload:function(start, count)
    // Overload:function(start, count, step)
    RangeDown: function(start, count, step)
    {
        if (step == null) step = 1;

        return new Linq.Object(function()
        {
            return new Linq.Enumerator(function()
            {
                if (this.Current == null) this.Current = start + step;
                if (start - count * step < this.Current - step)
                {
                    this.Current -= step;
                    return true;
                }
                return false;
            });
        });
    },

    // Overload:function(start, to)
    // Overload:function(start, to, step)
    RangeTo: function(start, to, step)
    {
        if (step == null) step = 1;

        return new Linq.Object(function()
        {
            return new Linq.Enumerator(function()
            {
                if (this.Current == null) this.Current = start - step;
                if (to >= this.Current + step)
                {
                    this.Current += step;
                    return true;
                }
                return false;
            });
        });
    },

    // Overload:function(start, to)
    // Overload:function(start, to, step)
    RangeDownTo: function(start, to, step)
    {
        if (step == null) step = 1;

        return new Linq.Object(function()
        {
            return new Linq.Enumerator(function()
            {
                if (this.Current == null) this.Current = start + step;
                if (to <= this.Current - step)
                {
                    this.Current -= step;
                    return true;
                }
                return false;
            });
        });
    },

    // Overload:function(obj)
    // Overload:function(obj, num)
    Repeat: function(obj, num)
    {
        return new Linq.Object(function()
        {
            if (num == null) num = Number.POSITIVE_INFINITY;
            var count = 0;
            return new Linq.Enumerator(function()
            {
                if (this.Current == null) this.Current = obj;
                return (count++ < num);
            });
        });
    },

    // Overload:function(func)
    // Overload:function(func, num)
    Times: function(func, num)
    {
        func = Linq.Utils.CreateFunctor(func);
        if (num == null) num = Number.POSITIVE_INFINITY;

        return new Linq.Object(function()
        {
            var count = 0;
            return new Linq.Enumerator(function()
            {
                if (count++ < num) this.Current = func();
                return (count <= num);
            });
        });
    },

    // Overload:function()
    // Overload:function(start)
    // Overload:function(start, step)
    ToInfinity: function(start, step)
    {
        if (start == null) start = 0;
        if (step == null) step = 1;
        return Linq.Enumerable.Range(start, Number.POSITIVE_INFINITY, step);
    },

    // Overload:function()
    // Overload:function(start)
    // Overload:function(start, step)
    ToNegativeInfinity: function(start, step)
    {
        if (start == null) start = 0;
        if (step == null) step = 1;
        return Linq.Enumerable.RangeDown(start, Number.POSITIVE_INFINITY, step);
    },

    Unfold: function(seed, func)
    {
        func = Linq.Utils.CreateFunctor(func);

        return new Linq.Object(function()
        {
            var isFirst = true;

            return new Linq.Enumerator(function()
            {
                if (isFirst)
                {
                    this.Current = seed;
                    isFirst = false;
                }
                else
                {
                    seed = func(seed);
                    this.Current = seed;
                }
                return true;
            });
        });
    }
}

// Use for Set Operation
Linq.HashSet = function()
{
    this.PrimitiveContainer = {};
    this.ObjectContainer = [];
}
Linq.HashSet.prototype =
{
    IsPrimitive: function(value)
    {
        switch (typeof value)
        {
            case "string":
            case "boolean":
            case "number":
            case "undefined":
                return true;
            case "object":
            case "function":
                return (value == null);
        }
    },

    Add: function(key)
    {
        if (this.IsPrimitive(key))
        {
            this.PrimitiveContainer[key] = null;
        }
        else
        {
            this.ObjectContainer.push(key);
        }
    },

    Contains: function(key)
    {
        if (this.IsPrimitive(key))
        {
            return this.PrimitiveContainer.hasOwnProperty(key);
        }
        else
        {
            for (var i = 0; i < this.ObjectContainer.length; i++)
            {
                if (key === this.ObjectContainer[i]) return true;
            }
            return false;
        }
    }
}


// Linq Extension Methods
Linq.Object.prototype =
{
    /* Projection and Filtering Methods */

    // Overload:function(func)
    // Overload:function(func, resultSelector<element>)
    // Overload:function(func, resultSelector<element, nestLevel>)
    CascadeBreadthFirst: function(func, resultSelector)
    {
        var source = this;
        func = Linq.Utils.CreateFunctor(func);
        resultSelector = (resultSelector == null)
            ? function(x) { return x }
            : Linq.Utils.CreateFunctor(resultSelector);

        return new Linq.Object(function()
        {
            var nestLevel = 0;
            var buffer = [];
            var enumerator = source.GetEnumerator();

            return new Linq.Enumerator(function()
            {
                while (true)
                {
                    if (enumerator.MoveNext())
                    {
                        buffer.push(enumerator.Current);
                        this.Current = resultSelector(enumerator.Current, nestLevel);
                        return true;
                    }
                    else
                    {
                        var next = Linq.Enumerable.From(buffer).SelectMany(function(x) { return func(x); });
                        if (!next.Any())
                        {
                            return false;
                        }
                        else
                        {
                            nestLevel++;
                            buffer = [];
                            enumerator = next.GetEnumerator();
                        }
                    }
                }
            });
        });
    },

    // Overload:function(func)
    // Overload:function(func, resultSelector<element>)
    // Overload:function(func, resultSelector<element, nestLevel>)
    CascadeDepthFirst: function(func, resultSelector)
    {
        var source = this;
        func = Linq.Utils.CreateFunctor(func);
        resultSelector = (resultSelector == null)
            ? function(x) { return x }
            : Linq.Utils.CreateFunctor(resultSelector);

        return new Linq.Object(function()
        {
            var enumeratorStack = [];
            var enumerator = source.GetEnumerator();

            return new Linq.Enumerator(function()
            {
                while (true)
                {
                    if (enumerator.MoveNext())
                    {
                        this.Current = resultSelector(enumerator.Current, enumeratorStack.length);
                        enumeratorStack.push(enumerator);
                        enumerator = Linq.Enumerable.From(func(enumerator.Current)).GetEnumerator();
                        return true;
                    }
                    else
                    {
                        if (enumeratorStack.length <= 0) return false;
                        enumerator = enumeratorStack.pop();
                    }
                }
            });
        });
    },

    Flatten: function()
    {
        var source = this;

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var middleEnumerator = null;

            return new Linq.Enumerator(function()
            {
                while (true)
                {
                    if (middleEnumerator != null)
                    {
                        if (middleEnumerator.MoveNext())
                        {
                            this.Current = middleEnumerator.Current;
                            return true;
                        }
                        else
                        {
                            middleEnumerator = null;
                        }
                    }

                    if (enumerator.MoveNext())
                    {
                        if (enumerator.Current instanceof Array)
                        {
                            middleEnumerator = Linq.Enumerable.From(enumerator.Current)
                                .SelectMany(function(i) { return i })
                                .Flatten()
                                .GetEnumerator();
                            continue;
                        }
                        else
                        {
                            this.Current = enumerator.Current;
                            return true;
                        }
                    }

                    return false;
                }
            });
        });
    },

    Pairwise: function(selector)
    {
        var source = this;
        selector = Linq.Utils.CreateFunctor(selector);

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var prev;

            return new Linq.Enumerator(function()
            {
                if (prev == null)
                {
                    enumerator.MoveNext();
                    prev = enumerator.Current;
                }
                if (enumerator.MoveNext())
                {
                    this.Current = selector(prev, enumerator.Current);
                    prev = enumerator.Current;
                    return true;
                }
                else
                {
                    return false;
                }
            });
        });
    },

    // Overload:function(func)
    // Overload:function(seed,func<value,element>)
    // Overload:function(seed,func<value,element>,resultSelector)
    Scan: function() // variable argument
    {
        var seed = null;
        var func;
        var resultSelector;
        var source = this;
        if (arguments.length == 1)
        {
            func = Linq.Utils.CreateFunctor(arguments[0]);
        }
        else
        {
            seed = arguments[0];
            func = Linq.Utils.CreateFunctor(arguments[1]);
            resultSelector = Linq.Utils.CreateFunctor(arguments[2]);
        }
        if (resultSelector == null) resultSelector = function(x) { return x; };

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var value;
            var isFirst = true;

            return new Linq.Enumerator(function()
            {
                if (isFirst)
                {
                    isFirst = false;
                    if (seed == null)
                    {
                        if (enumerator.MoveNext())
                        {
                            value = enumerator.Current;
                            this.Current = resultSelector(value);
                            return true;
                        }
                    }
                    else
                    {
                        value = seed;
                        this.Current = resultSelector(value);
                        return true;
                    }
                }

                if (enumerator.MoveNext())
                {
                    value = func(value, enumerator.Current);
                    this.Current = resultSelector(value);
                    return true;
                }
                else
                {
                    return false;
                }
            });
        });
    },

    // Overload:function(selector<element>)
    // Overload:function(selector<element,index>)
    Select: function(selector)
    {
        var source = this;
        selector = Linq.Utils.CreateFunctor(selector);

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var index = 0;

            return new Linq.Enumerator(function()
            {
                if (enumerator.MoveNext())
                {
                    this.Current = selector(enumerator.Current, index++);
                    return true;
                }
                else
                {
                    return false;
                }
            });
        });
    },

    // Overload:function(collectionSelector<element>)
    // Overload:function(collectionSelector<element,index>)
    // Overload:function(collectionSelector<element>,resultSelector)
    // Overload:function(collectionSelector<element,index>,resultSelector)
    SelectMany: function(collectionSelector, resultSelector)
    {
        var source = this;
        collectionSelector = Linq.Utils.CreateFunctor(collectionSelector);
        resultSelector = Linq.Utils.CreateFunctor(resultSelector);
        if (resultSelector == null) resultSelector = function(a, b) { return b; }

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var middleEnumerator = null;
            var index = 0;
            var isFirst = true;

            return new Linq.Enumerator(function()
            {
                do
                {
                    if (isFirst)
                    {
                        isFirst = false;
                        continue;
                    }
                    if (middleEnumerator == null)
                    {
                        var middleSeq = collectionSelector(enumerator.Current, index++);
                        middleEnumerator = Linq.Enumerable.From(middleSeq).GetEnumerator();
                    }
                    if (middleEnumerator.MoveNext())
                    {
                        this.Current = resultSelector(enumerator.Current, middleEnumerator.Current);
                        return true;
                    }
                    else
                    {
                        middleEnumerator = null;
                    }
                } while (enumerator.MoveNext())
                return false;
            });
        });
    },

    Slice: function(size)
    {
        var source = this;

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();

            return new Linq.Enumerator(function()
            {
                var array = [];
                var count = 0;
                while (enumerator.MoveNext())
                {
                    array.push(enumerator.Current);
                    if (++count >= size)
                    {
                        this.Current = array;
                        return true;
                    }
                }
                if (array.length > 0)
                {
                    this.Current = array;
                    return true;
                }
                return false;
            });
        });
    },

    // Overload:function(predicate<element>)
    // Overload:function(predicate<element,index>)
    Where: function(predicate)
    {
        predicate = Linq.Utils.CreateFunctor(predicate);
        var source = this;

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var index = 0;

            return new Linq.Enumerator(function()
            {
                while (enumerator.MoveNext())
                {
                    if (predicate(enumerator.Current, index++))
                    {
                        this.Current = enumerator.Current;
                        return true;
                    }
                }
                return false;
            });
        });
    },

    // Overload:function(second,selector<outer,inner>)
    // Overload:function(second,selector<outer,inner,index>)
    ZipWith: function(second, selector)
    {
        selector = Linq.Utils.CreateFunctor(selector);
        var source = this;
        second = Linq.Enumerable.From(second);

        return new Linq.Object(function()
        {
            var firstEnumerator = source.GetEnumerator();
            var secondEnumerator = second.GetEnumerator();
            var index = 0;

            return new Linq.Enumerator(function()
            {
                if (firstEnumerator.MoveNext() && secondEnumerator.MoveNext())
                {
                    this.Current = selector(firstEnumerator.Current, secondEnumerator.Current, index++);
                    return true;
                }
                else
                {
                    return false;
                }
            });
        });
    },

    /* Join Methods */

    Join: function(inner, outerKeySelector, innerKeySelector, resultSelector)
    {
        outerKeySelector = Linq.Utils.CreateFunctor(outerKeySelector);
        innerKeySelector = Linq.Utils.CreateFunctor(innerKeySelector);
        resultSelector = Linq.Utils.CreateFunctor(resultSelector);
        var source = this;
        inner = Linq.Enumerable.From(inner);

        return new Linq.Object(function()
        {
            var outerEnumerator = source.GetEnumerator();
            var lookup = null;
            var isInnerOut = true;
            var innerCount = 0;
            return new Linq.Enumerator(function()
            {
                if (lookup == null) lookup = inner.ToLookup(innerKeySelector);
                while (true)
                {
                    if (!isInnerOut || outerEnumerator.MoveNext())
                    {
                        var key = outerKeySelector(outerEnumerator.Current);
                        if (lookup.hasOwnProperty(key))
                        {
                            var innerElement = lookup[key][innerCount++];
                            if (innerElement != null)
                            {
                                this.Current = resultSelector(outerEnumerator.Current, innerElement);
                                isInnerOut = false;
                                return true;
                            }
                        }
                        isInnerOut = true;
                        innerCount = 0;
                    }
                    else
                    {
                        return false;
                    }
                }
            });
        });
    },

    GroupJoin: function(inner, outerKeySelector, innerKeySelector, resultSelector)
    {
        outerKeySelector = Linq.Utils.CreateFunctor(outerKeySelector);
        innerKeySelector = Linq.Utils.CreateFunctor(innerKeySelector);
        resultSelector = Linq.Utils.CreateFunctor(resultSelector);
        var source = this;
        inner = Linq.Enumerable.From(inner);

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var lookup = null;

            return new Linq.Enumerator(function()
            {
                if (lookup == null) lookup = inner.ToLookup(innerKeySelector);
                if (enumerator.MoveNext())
                {
                    var innerElement = Linq.Enumerable.From(lookup[outerKeySelector(enumerator.Current)]);
                    this.Current = resultSelector(enumerator.Current, innerElement);
                    return true;
                }
                else
                {
                    return false;
                }
            });
        });
    },

    /* Set Methods */

    All: function(predicate)
    {
        predicate = Linq.Utils.CreateFunctor(predicate);

        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            if (!predicate(enumerator.Current)) return false;
        }
        return true;
    },

    // Overload:function()
    // Overload:function(predicate)
    Any: function(predicate)
    {
        predicate = Linq.Utils.CreateFunctor(predicate);

        var enumerator = this.GetEnumerator();
        if (arguments.length == 0) return enumerator.MoveNext(); // case:function()
        while (enumerator.MoveNext()) // case:function(predicate)
        {
            if (predicate(enumerator.Current)) return true;
        }
        return false;
    },

    Concat: function(second)
    {
        var source = this;
        second = Linq.Enumerable.From(second);

        return new Linq.Object(function()
        {
            var firstEnumerator = source.GetEnumerator();
            var secondEnumerator = second.GetEnumerator();
            var isEndFirst = false;

            return new Linq.Enumerator(function()
            {
                if (!isEndFirst && firstEnumerator.MoveNext())
                {
                    this.Current = firstEnumerator.Current;
                    return true;
                }
                else if (secondEnumerator.MoveNext())
                {
                    isEndFirst = true;
                    this.Current = secondEnumerator.Current;
                    return true;
                }
                return false;
            });
        });
    },

    Insert: function(index, second)
    {
        var source = this;
        second = Linq.Enumerable.From(second);

        return new Linq.Object(function()
        {
            var firstEnumerator = source.GetEnumerator();
            var secondEnumerator = second.GetEnumerator();
            var count = 0;
            var isEnumerated = false;

            return new Linq.Enumerator(function()
            {
                if (count == index && secondEnumerator.MoveNext())
                {
                    this.Current = secondEnumerator.Current;
                    isEnumerated = true;
                    return true;
                }
                if (firstEnumerator.MoveNext())
                {
                    this.Current = firstEnumerator.Current;
                    count++;
                    return true;
                }
                if (!isEnumerated && secondEnumerator.MoveNext())
                {
                    this.Current = secondEnumerator.Current;
                    return true;
                }
                return false;
            });
        });
    },

    // Overload:function(value)
    // Overload:function(value, compareSelector)
    Contains: function(value, compareSelector)
    {
        compareSelector = (compareSelector == null)
            ? function(x) { return x }
            : Linq.Utils.CreateFunctor(compareSelector);
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            if (compareSelector(enumerator.Current) === value) return true;
        }
        return false;
    },

    DefaultIfEmpty: function(defaultValue)
    {
        var source = this;

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var isFirst = true;

            return new Linq.Enumerator(function()
            {
                if (enumerator.MoveNext())
                {
                    this.Current = enumerator.Current;
                    isFirst = false;
                    return true;
                }
                else if (isFirst)
                {
                    this.Current = defaultValue;
                    isFirst = false;
                    return true;
                }
                return false;
            });
        });
    },

    // Overload:function()
    // Overload:function(compareSelector)
    Distinct: function(compareSelector)
    {
        compareSelector = (compareSelector == null)
            ? function(x) { return x }
            : Linq.Utils.CreateFunctor(compareSelector);
        return this.Union(Linq.Enumerable.Empty(), compareSelector);
    },

    // Overload:function(second)
    // Overload:function(second, compareSelector)
    Except: function(second, compareSelector)
    {
        compareSelector = (compareSelector == null)
            ? function(x) { return x }
            : Linq.Utils.CreateFunctor(compareSelector);
        var source = this;
        second = Linq.Enumerable.From(second);

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var hashSet = null;
            var keys = Linq.Utils.CreateHashSet();

            return new Linq.Enumerator(function()
            {
                if (hashSet == null) hashSet = Linq.Utils.CreateHashSet(second, compareSelector);

                while (enumerator.MoveNext())
                {
                    if (!hashSet.Contains(compareSelector(enumerator.Current)) &&
                        !keys.Contains(compareSelector(enumerator.Current)))
                    {
                        keys.Add(compareSelector(enumerator.Current));
                        this.Current = enumerator.Current;
                        return true;
                    }
                }
                return false;
            });
        });
    },

    // Overload:function(second)
    // Overload:function(second, compareSelector)
    Intersect: function(second, compareSelector)
    {
        compareSelector = (compareSelector == null)
            ? function(x) { return x }
            : Linq.Utils.CreateFunctor(compareSelector);
        var source = this;
        second = Linq.Enumerable.From(second);

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var hashSet = null;
            var keys = Linq.Utils.CreateHashSet();

            return new Linq.Enumerator(function()
            {
                if (hashSet == null) hashSet = Linq.Utils.CreateHashSet(second, compareSelector);

                while (enumerator.MoveNext())
                {
                    if (hashSet.Contains(compareSelector(enumerator.Current))
                        && !keys.Contains(compareSelector(enumerator.Current)))
                    {
                        keys.Add(compareSelector(enumerator.Current));
                        this.Current = enumerator.Current;
                        return true;
                    }
                }
                return false;
            });
        });
    },

    // Overload:function(second)
    // Overload:function(second, compareSelector)
    SequenceEqual: function(second, compareSelector)
    {
        compareSelector = (compareSelector == null)
            ? function(x) { return x }
            : Linq.Utils.CreateFunctor(compareSelector);
        var firstEnumerator = this.GetEnumerator();
        var secondEnumerator = Linq.Enumerable.From(second).GetEnumerator();
        while (firstEnumerator.MoveNext())
        {
            if (!secondEnumerator.MoveNext() ||
                compareSelector(firstEnumerator.Current) !== compareSelector(secondEnumerator.Current))
            {
                return false;
            }
        }
        if (secondEnumerator.MoveNext())
        {
            return false;
        }
        return true;
    },

    Union: function(second, compareSelector)
    {
        compareSelector = (compareSelector == null)
            ? function(x) { return x }
            : Linq.Utils.CreateFunctor(compareSelector);
        var source = this;
        second = Linq.Enumerable.From(second);

        return new Linq.Object(function()
        {
            var firstEnumerator = source.GetEnumerator();
            var secondEnumerator = second.GetEnumerator();
            var isEndFirst = false;
            var keys = Linq.Utils.CreateHashSet();

            return new Linq.Enumerator(function()
            {
                while (!isEndFirst && firstEnumerator.MoveNext())
                {
                    if (!keys.Contains(compareSelector(firstEnumerator.Current)))
                    {
                        keys.Add(compareSelector(firstEnumerator.Current));
                        this.Current = firstEnumerator.Current;
                        return true;
                    }
                }
                isEndFirst = true;
                while (secondEnumerator.MoveNext())
                {
                    if (!keys.Contains(compareSelector(secondEnumerator.Current)))
                    {
                        keys.Add(compareSelector(secondEnumerator.Current));
                        this.Current = secondEnumerator.Current;
                        return true;
                    }
                }
                return false;
            });
        });
    },

    /* Ordering Methods */

    // private method
    _CreateOrderByObject: function(source, keySelector, isDescending)
    {
        return new Linq.Object(function(comparers)
        {
            var enumerator = null;
            if (comparers != null) comparers.reverse();

            return new Linq.Enumerator(function()
            {
                if (enumerator == null)
                {
                    // Schwartzian Transform
                    var sortedArray = source
                        .Select(function(value) { return { key: keySelector(value), value: value }; })
                        .ToArray()
                        .sort(function(a, b)
                        {
                            var result = (isDescending)
                                ? b.key - a.key
                                : a.key - b.key;
                            // ThenBy    
                            if (result == 0 && comparers != null)
                            {
                                for (var i = 0; i < comparers.length; ++i)
                                {
                                    var selector = comparers[i].selector;
                                    result = (comparers[i].isDescending)
                                        ? selector(b.value) - selector(a.value)
                                        : selector(a.value) - selector(b.value);
                                    if (result != 0) break;
                                }
                            }
                            return result;
                        });
                    enumerator = Linq.Enumerable.From(sortedArray)
                        .Select(function(t) { return t.value; })
                        .GetEnumerator();
                }
                while (enumerator.MoveNext())
                {
                    this.Current = enumerator.Current;
                    return true;
                }
                return false;
            });
        });
    },

    // private method
    _CreateThenByObject: function(source, keySelector, isDescending)
    {
        return new Linq.Object(function(comparers)
        {
            if (comparers == null) comparers = [];
            comparers.push({ selector: keySelector, isDescending: isDescending });
            var enumerator = source.GetEnumerator(comparers);

            return new Linq.Enumerator(function()
            {
                while (enumerator.MoveNext())
                {
                    this.Current = enumerator.Current;
                    return true;
                }
                return false;
            });
        });
    },

    OrderBy: function(keySelector)
    {
        keySelector = Linq.Utils.CreateFunctor(keySelector);
        return this._CreateOrderByObject(this, keySelector, false); // not Descending
    },

    OrderByDescending: function(keySelector)
    {
        keySelector = Linq.Utils.CreateFunctor(keySelector);
        return this._CreateOrderByObject(this, keySelector, true);
    },

    ThenBy: function(keySelector)
    {
        keySelector = Linq.Utils.CreateFunctor(keySelector);
        return this._CreateThenByObject(this, keySelector, false); // not Descending
    },

    ThenByDescending: function(keySelector)
    {
        keySelector = Linq.Utils.CreateFunctor(keySelector);
        return this._CreateThenByObject(this, keySelector, true);
    },

    Reverse: function()
    {
        var source = this;

        return new Linq.Object(function()
        {
            var buffer = null;
            var index;

            return new Linq.Enumerator(function()
            {
                if (buffer == null)
                {
                    buffer = source.ToArray();
                    index = buffer.length;
                }
                if (index > 0)
                {
                    this.Current = buffer[--index];
                    return true;
                }
                return false;
            });
        });
    },

    Shuffle: function()
    {
        var source = this;

        return new Linq.Object(function()
        {
            var buffer = null;

            return new Linq.Enumerator(function()
            {
                if (buffer == null)
                {
                    buffer = source.ToArray();
                }
                if (buffer.length > 0)
                {
                    var i = Math.floor(Math.random() * buffer.length);
                    this.Current = buffer.splice(i, 1)[0];
                    return true;
                }
                return false;
            });
        });
    },

    /* Grouping Methods */

    // Overload:function(keySelector)
    // Overload:function(keySelector,elementSelector)
    // Overload:function(keySelector,elementSelector,resultSelector)
    GroupBy: function(keySelector, elementSelector, resultSelector)
    {
        var source = this;
        keySelector = Linq.Utils.CreateFunctor(keySelector);
        elementSelector = (elementSelector == null)
            ? function(x) { return x }
            : Linq.Utils.CreateFunctor(elementSelector);
        resultSelector = (resultSelector == null)
            ? function(x, y) { return { Key: x, Value: y} }
            : Linq.Utils.CreateFunctor(resultSelector);

        return new Linq.Object(function()
        {
            var enumerator = null;

            return new Linq.Enumerator(function()
            {
                if (enumerator == null)
                {
                    var lookup = source.ToLookup(keySelector, elementSelector);
                    enumerator = Linq.Enumerable.From(lookup).GetEnumerator();
                }
                while (enumerator.MoveNext())
                {
                    var key = enumerator.Current.Key;
                    var value = Linq.Enumerable.From(enumerator.Current.Value);
                    this.Current = resultSelector(key, value);
                    return true;
                }
                return false;
            });
        });
    },

    /* Aggregate Methods */

    // Overload:function(func)
    // Overload:function(seed,func)
    // Overload:function(seed,func,resultSelector)
    Aggregate: function() // variable argument
    {
        var value;
        var func;
        var resultSelector;
        var enumerator = this.GetEnumerator();
        if (arguments.length == 1)
        {
            enumerator.MoveNext();
            value = enumerator.Current;
            func = Linq.Utils.CreateFunctor(arguments[0]);
        }
        else
        {
            value = arguments[0];
            func = Linq.Utils.CreateFunctor(arguments[1]);
            resultSelector = Linq.Utils.CreateFunctor(arguments[2]);
        }
        if (resultSelector == null) resultSelector = function(x) { return x; };

        while (enumerator.MoveNext())
        {
            value = func(value, enumerator.Current);
        }

        return resultSelector(value);
    },

    // Overload:function()
    // Overload:function(selector)
    Average: function(selector)
    {
        selector = (selector == null)
            ? selector = function(x) { return x; }
            : Linq.Utils.CreateFunctor(selector);

        var value;
        var sum = 0;
        var count = 0;
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            sum += selector(enumerator.Current);
            ++count;
        }
        return sum / count;
    },

    // Overload:function()
    // Overload:function(predicate)
    Count: function(predicate)
    {
        predicate = (predicate == null)
            ? function(x) { return true; }
            : Linq.Utils.CreateFunctor(predicate);

        var count = 0;
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            if (predicate(enumerator.Current)) ++count;
        }
        return count;
    },

    // Overload:function()
    // Overload:function(selector)
    Max: function(selector)
    {
        if (selector == null) selector = function(x) { return x; }
        return this.Select(selector).Aggregate(function(a, b) { return (a > b) ? a : b; });
    },

    // Overload:function()
    // Overload:function(selector)
    Min: function(selector)
    {
        if (selector == null) selector = function(x) { return x; }
        return this.Select(selector).Aggregate(function(a, b) { return (a < b) ? a : b; });
    },

    // Overload:function()
    // Overload:function(selector)
    Sum: function(selector)
    {
        if (selector == null) selector = function(x) { return x; }
        return this.Select(selector).Aggregate(function(a, b) { return a + b; });
    },

    /* Paging Methods */

    ElementAt: function(index)
    {
        var count = 0;
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            if (count++ == index) return enumerator.Current;
        }
        return null;
    },

    ElementAtOrDefault: function(index, defaultValue)
    {
        var count = 0;
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            if (count++ == index) return enumerator.Current;
        }
        return defaultValue;
    },

    // Overload:function()
    // Overload:function(predicate)
    First: function(predicate)
    {
        predicate = (predicate == null)
            ? function() { return true; }
            : Linq.Utils.CreateFunctor(predicate);

        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            if (predicate(enumerator.Current)) return enumerator.Current;
        }
        return null;
    },

    // Overload:function(defaultValue)
    // Overload:function(defaultValue,predicate)
    FirstOrDefault: function(defaultValue, predicate)
    {
        predicate = (predicate == null)
            ? function() { return true; }
            : Linq.Utils.CreateFunctor(predicate);

        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            if (predicate(enumerator.Current)) return enumerator.Current;
        }
        return defaultValue;
    },

    // Overload:function()
    // Overload:function(predicate)
    Last: function(predicate)
    {
        predicate = (predicate == null)
            ? function() { return true; }
            : Linq.Utils.CreateFunctor(predicate);

        var enumerator = this.GetEnumerator();
        var value = null;
        while (enumerator.MoveNext())
        {
            if (predicate(enumerator.Current)) value = enumerator.Current;
        }
        return value;
    },

    // Overload:function(defaultValue)
    // Overload:function(defaultValue,predicate)
    LastOrDefault: function(defaultValue, predicate)
    {
        predicate = (predicate == null)
            ? function() { return true; }
            : Linq.Utils.CreateFunctor(predicate);

        var enumerator = this.GetEnumerator();
        var value = null;
        while (enumerator.MoveNext())
        {
            if (predicate(enumerator.Current)) value = enumerator.Current;
        }
        if (value != null) return value;
        else return defaultValue;
    },

    // Overload:function()
    // Overload:function(predicate)
    Single: function(predicate)
    {
        predicate = (predicate == null)
            ? function() { return true; }
            : Linq.Utils.CreateFunctor(predicate);

        var enumerator = this.GetEnumerator();
        var value = null;
        while (enumerator.MoveNext())
        {
            if (predicate(enumerator.Current))
            {
                if (value == null) value = enumerator.Current;
                else throw new Error("Single:sequence contains more than one element.");
            }
        }
        if (value != null) return value;
        else throw new Error("Single:No element satisfies the condition.");
    },

    // Overload:function(defaultValue)
    // Overload:function(defaultValue,predicate)
    SingleOrDefault: function(defaultValue, predicate)
    {
        predicate = (predicate == null)
            ? function() { return true; }
            : Linq.Utils.CreateFunctor(predicate);

        var enumerator = this.GetEnumerator();
        var value = null;
        while (enumerator.MoveNext())
        {
            if (predicate(enumerator.Current))
            {
                if (value == null) value = enumerator.Current;
                else throw new Error("Single:sequence contains more than one element.");
            }
        }
        if (value != null) return value;
        else return defaultValue;
    },

    Skip: function(count)
    {
        var source = this;

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var index = 0;

            return new Linq.Enumerator(function()
            {
                while (index++ < count) enumerator.MoveNext();

                if (enumerator.MoveNext())
                {
                    this.Current = enumerator.Current;
                    return true;
                }
                else
                {
                    return false;
                }
            });
        });
    },

    // Overload:function(predicate<element>)
    // Overload:function(predicate<element,index>)
    SkipWhile: function(predicate)
    {
        predicate = Linq.Utils.CreateFunctor(predicate);
        var source = this;

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var isSkipEnd = false;
            var index = 0;

            return new Linq.Enumerator(function()
            {
                while (!isSkipEnd)
                {
                    if (enumerator.MoveNext())
                    {
                        if (!predicate(enumerator.Current, index++))
                        {
                            isSkipEnd = true;
                            this.Current = enumerator.Current;
                            return true;
                        }
                    }
                    else
                    {
                        isSkipEnd = true;
                    }
                }

                if (enumerator.MoveNext())
                {
                    this.Current = enumerator.Current;
                    return true;
                }
                else
                {
                    return false;
                }
            });
        });
    },

    Take: function(count)
    {
        var source = this;

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var index = 0;

            return new Linq.Enumerator(function()
            {
                if (index++ < count && enumerator.MoveNext())
                {
                    this.Current = enumerator.Current;
                    return true;
                }
                else
                {
                    return false;
                }
            });
        });
    },

    // Overload:function(predicate<element>)
    // Overload:function(predicate<element,index>)
    TakeWhile: function(predicate)
    {
        predicate = Linq.Utils.CreateFunctor(predicate);
        var source = this;

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var isTakeEnd = false;
            var index = 0;

            return new Linq.Enumerator(function()
            {
                if (!isTakeEnd && enumerator.MoveNext())
                {
                    if (predicate(enumerator.Current, index++))
                    {
                        this.Current = enumerator.Current;
                        return true;
                    }
                    isTakeEnd = true;
                }
                return false;
            });
        });
    },

    IndexOf: function(item)
    {
        var count = 0;
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            if (enumerator.Current === item) return count;
            count++;
        }
        return -1;
    },

    LastIndexOf: function(item)
    {
        var count = 0;
        var result = -1;
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            if (enumerator.Current === item) result = count;
            count++;
        }
        return result;
    },

    /* Convert Methods */

    ToArray: function()
    {
        var array = [];
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            array.push(enumerator.Current);
        }
        return array;
    },

    ToJSON: function()
    {
        var escapeDictionary =
        {
            "\"": "\\\"",
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\\": "\\\\"
        };

        var SerializeValue = function(elem)
        {
            var result;
            switch (typeof elem)
            {
                case "string":
                    result = "\"" + elem.replace(/["\b\t\n\f\r\\]/g, function(m) { return escapeDictionary[m] }) + "\"";
                    break;
                case "boolean":
                    result = String(elem);
                    break;
                case "number":
                    result = isFinite(elem) ? String(elem) : "null";
                    break;
                case "object":
                    result =
                        (elem == null) ? "null" :
                        (elem instanceof Array) ? Linq.Enumerable.From(elem).ToJSON() :
                        SerializeObject(elem);
                    break;
                default: // function or undefined
                    result = null;
                    break;
            }
            return result;
        }

        var SerializeObject = function(elem)
        {
            var _arr = [];
            for (var key in elem)
            {
                if (!(elem[key] instanceof Function))
                {
                    var value = SerializeValue(elem[key]);
                    _arr.push("\"" + key + "\"" + ":" + value);
                }
            }
            if (_arr.length > 0) return "{" + _arr.join(",") + "}";
            else return null;
        }

        var array = [];
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            var element = enumerator.Current;
            element = SerializeValue(element);
            if (element != null) array.push(element);
        }
        return "[" + array.join(",") + "]";
    },

    // Overload:function(keySelector)
    // Overload:function(keySelector, elementSelector)
    ToLookup: function(keySelector, elementSelector)
    {
        keySelector = Linq.Utils.CreateFunctor(keySelector);
        elementSelector = (elementSelector == null)
            ? function(x) { return x }
            : Linq.Utils.CreateFunctor(elementSelector);

        var lookup = {};
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            var key = keySelector(enumerator.Current);
            var element = elementSelector(enumerator.Current);
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
        keySelector = Linq.Utils.CreateFunctor(keySelector);
        elementSelector = Linq.Utils.CreateFunctor(elementSelector);

        var obj = {};
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            var key = keySelector(enumerator.Current);
            var element = elementSelector(enumerator.Current);
            obj[key] = element;
        }
        return obj;
    },

    // Overload:function()
    // Overload:function(separator)
    // Overload:function(separator,selector)
    ToString: function(separator, selector)
    {
        if (separator == null) separator = "";
        if (selector == null) selector = function(x) { return x; }

        return this.Select(selector).ToArray().join(separator);
    },

    ToTable: function(/*variable argument(selectors)*/)
    {
        var args;
        if (arguments[0] instanceof Array) args = arguments[0];
        else args = arguments;

        for (var i = 0; i < args.length; i++)
        {
            args[i] = Linq.Utils.CreateFunctor(args[i]);
        }

        var array = [];
        array.push("<table>");
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            array.push("<tr>");
            for (var j = 0; j < args.length; j++)
            {
                array.push("<td>");
                array.push(args[j](enumerator.Current));
                array.push("</td>");
            }
            array.push("</tr>");
        }
        array.push("</table>");
        return array.join("");
    },

    /* Action Methods */

    // Overload:function(action<element>)
    // Overload:function(action<element,index>)
    Do: function(action)
    {
        var source = this;
        action = Linq.Utils.CreateFunctor(action);

        return new Linq.Object(function()
        {
            var enumerator = source.GetEnumerator();
            var index = 0;

            return new Linq.Enumerator(function()
            {
                if (enumerator.MoveNext())
                {
                    this.Current = enumerator.Current;
                    action(this.Current, index++);
                    return true;
                }
                else
                {
                    return false;
                }
            });
        });
    },

    // Overload:function(action<element>)
    // Overload:function(action<element,index>)
    // Overload:function(func<element,bool>)
    // Overload:function(func<element,index,bool>)
    ForEach: function(action)
    {
        action = Linq.Utils.CreateFunctor(action);

        var index = 0;
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext())
        {
            if (action(enumerator.Current, index++) === false) break;
        }
    },

    // Overload:function()
    // Overload:function(separator)
    // Overload:function(separator,selector)
    Write: function(separator, selector)
    {
        if (separator == null) separator = "";
        selector = (selector == null)
            ? function(x) { return x; }
            : Linq.Utils.CreateFunctor(selector);

        var isFirst = true;
        this.ForEach(function(item)
        {
            if (isFirst) isFirst = false;
            else document.write(separator);
            document.write(selector(item));
        });
    },

    // Overload:function()
    // Overload:function(selector)
    WriteLine: function(selector)
    {
        selector = (selector == null)
            ? function(x) { return x; }
            : Linq.Utils.CreateFunctor(selector);

        this.ForEach(function(item)
        {
            document.write(selector(item));
            document.write("<br />");
        });
    },

    /* For Debug Methods */

    Force: function()
    {
        var enumerator = this.GetEnumerator();
        while (enumerator.MoveNext());
    },

    // Overload:function()
    // Overload:function(message)
    // Overload:function(message,selector)
    Trace: function(message, selector)
    {
        if (message == null) message = "Trace";
        selector = (selector == null)
            ? function(x) { return x; }
            : Linq.Utils.CreateFunctor(selector);

        return this.Do(function(item)
        {
            document.write(message, ":", selector(item));
            document.write("<br />");
        });
    },

    // Overload:function()
    // Overload:function(message)
    // Overload:function(message,selector)
    TraceF: function(message, selector)
    {
        if (message == null) message = "Trace";
        selector = (selector == null)
            ? function(x) { return x; }
            : Linq.Utils.CreateFunctor(selector);

        return this.Do(function(item)
        {
            console.log(message, ":", selector(item));
        });
    }
}