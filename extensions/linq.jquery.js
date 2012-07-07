// binding for jQuery
// toEnumerable / TojQuery

(function (root) {
    if (root.Enumerable == null) {
        throw new Error("can't find Enumerable. linq.jquery.js must load after linq.js");
    }
    if (root.jQuery == null) {
        throw new Error("can't find jQuery. linq.jquery.js must load after jQuery");
    }

    var Enumerable = root.Enumerable;
    var $ = root.jQuery;

    $.fn.toEnumerable = function () {
        /// <summary>each contains elements. to Enumerable&lt;jQuery&gt;.</summary>
        /// <returns type="Enumerable"></returns>
        return Enumerable.from(this).select(function (e) { return $(e) });
    }

    Enumerable.prototype.TojQuery = function () {
        /// <summary>Enumerable to jQuery.</summary>
        /// <returns type="jQuery"></returns>
        return $(this.toArray());
    }
})(this);