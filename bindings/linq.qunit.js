// QUnit Extensions
// Method Chaning base assertion.

/// <reference path="~/linq.js" />

(function () {
    // overwrite array
    Enumerable.Utils.extendTo(Array);

    // checker
    var isCollection = function (obj) {
        if (obj instanceof Enumerable) return true;
        if (obj instanceof Array) return true;

        return false;
    };

    // support only modern browser
    Object.defineProperty(Object.prototype, "is", {
        enumerable: false,
        configurable: false,
        writable: true,
        value: function (v) {
            if (isCollection(this)) {
                if (arguments.length == 1 && isCollection(v)) {
                    deepEqual(Enumerable.from(this).toArray(), v);
                }
                else {
                    deepEqual(Enumerable.from(this).toArray(), Enumerable.from(arguments).toArray());
                }
            }
            else {
                strictEqual(this, v);
            }
        }
    });
})();