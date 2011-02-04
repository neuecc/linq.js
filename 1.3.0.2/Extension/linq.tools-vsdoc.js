if (typeof Linq == "undefined") Linq = {};
Linq.Tools = {}

/* String.Format */

// Overload:function(template, Object replacement)
// Overload:function(template, Array replacement)
// Overload:function(template, params args)
Linq.Tools.Template = function(template, replacement)
{
    /// <summary>
    /// 1. template {0} - param Strings or Array
    /// 2. template {id} - Object
    /// </summary>
    /// <param name="template" type="String"></param>
    /// <param name="replacement" type="Object_or_Array_or_ParamsString"></param>
    /// <returns type="String"></returns>
}

/* StringBuilder */

Linq.Tools.StringBuilder = function(){}
Linq.Tools.StringBuilder.Create = function()
{
    /// <returns type="Linq.Tools.StringBuilder"></returns>
}
Linq.Tools.StringBuilder.prototype =
{
    Append: function(value)
    {
        /// <returns type="Linq.Tools.StringBuilder"></returns>
    },

    AppendLine: function(value)
    {
        /// <returns type="Linq.Tools.StringBuilder"></returns>
    },

    AppendFormat: function(template, replacement)
    {
        /// <returns type="Linq.Tools.StringBuilder"></returns>
    },

    Reverse: function()
    {
        /// <returns type="Linq.Tools.StringBuilder"></returns>
    },

    ToString: function()
    {
        /// <returns type="String"></returns>
    }
}

/* Stopwatch */

Linq.Tools.Stopwatch = function() { }
Linq.Tools.Stopwatch.Create = function()
{
    /// <returns type="Linq.Tools.Stopwatch"></returns>
}
Linq.Tools.Stopwatch.StartNew = function()
{
    /// <returns type="Linq.Tools.Stopwatch"></returns>
}
Linq.Tools.Stopwatch.Bench = function(times, action)
{
    /// <returns type="Number"></returns>
}
Linq.Tools.Stopwatch.prototype =
{
    Start: function()
    {
        /// <returns type="void"></returns>
    },

    Stop: function()
    {
        /// <returns type="void"></returns>
    },

    Reset: function()
    {
        /// <returns type="void"></returns>
    },

    IsRunning: function()
    {
        /// <returns type="Boolean"></returns>
    },

    Elapsed: function()
    {
        /// <returns type="Number"></returns>
    }
}

/* HashSet */

Linq.Tools.HashSet = function() { }

// Overload:function()
// Overload:function(params keys)
// Overload:function(array key)
Linq.Tools.HashSet.Create = function(keys)
{
    /// <param name="keys" type="Optional:ParamsString_or_Array"></param>
    /// <returns type="Linq.Tools.HashSet"></returns>
}

Linq.Tools.HashSet.prototype =
{
    Add: function(key)
    {
        /// <returns type="void"></returns>
    },

    AsLinqable: function()
    {
        /// <returns type="Linq.Object"></returns>
    },

    Clear: function()
    {
        /// <returns type="void"></returns>
    },

    Contains: function(key)
    {
        /// <returns type="Boolean"></returns>
    },

    Count: function()
    {
        /// <returns type="Number"></returns>
    },

    Remove: function(key)
    {
        /// <returns type="void"></returns>
    }
}

/* HttpUtility */

Linq.Tools.HttpUtility = {};

Linq.Tools.HttpUtility.HtmlEncode = function(input)
{
    /// <returns type="String"></returns>
}

Linq.Tools.HttpUtility.HtmlDecode = function(input)
{
    /// <returns type="String"></returns>
}

Linq.Tools.HttpUtility.ParseQueryString = function(query)
{
    /// <returns type="Object"></returns>
}

Linq.Tools.HttpUtility.ToQueryString = function(obj)
{
    /// <returns type="String"></returns>
}

/* DateTimeUtility */

Linq.Tools.DateUtility = {};

Linq.Tools.DateUtility.DaysInMonth = function(year, month)
{
    /// <returns type="Number"></returns>
}

Linq.Tools.DateUtility.IsLeapYear = function(year)
{
    /// <returns type="Boolean"></returns>
}

Linq.Tools.DateUtility.Format = function(date, format)
{
    /// <returns type="String"></returns>
}

Linq.Tools.DateUtility.Parse = function(strDate, format)
{
    /// <returns type="Date"></returns>
}