// binding for jQuery
// toEnumerable / TojQuery

(function ($, Enumerable)
{
    $.fn.toEnumerable = function ()
    {
        /// <summary>each contains elements. to Enumerable&lt;jQuery&gt;.</summary>
        /// <returns type="Enumerable"></returns>
        return Enumerable.from(this).select(function (e) { return $(e) });
    }

    Enumerable.prototype.TojQuery = function ()
    {
        /// <summary>Enumerable to jQuery.</summary>
        /// <returns type="jQuery"></returns>
        return $(this.toArray());
    }
})(jQuery, this.Enumerable || this.jQuery.Enumerable)