// QUnit Extensions
// Method Chaning base assertion.

(function () {
    // overwrite array
    Enumerable.Utils.extendTo(Array);

    // defProp helper, support only modern browser
    var defineToObject = function (methodName, value) {
        Object.defineProperty(Object.prototype, methodName, {
            enumerable: false,
            configurable: false,
            writable: true,
            value: value
        });
    };

    // checker
    var isCollection = function (obj) {
        if (obj instanceof Enumerable) return true;
        if (obj instanceof Array) return true;

        return false;
    };

    var executeCode = function (action) {
        try {
            action();
            return null;
        }
        catch (e) {
            return e;
        }
    };

    defineToObject("is", function (expected, message) {
        if (isCollection(this)) {
            if (arguments.length == 1 && isCollection(expected)) {
                deepEqual(Enumerable.from(this).toArray(), expected, message);
            }
            else {
                deepEqual(Enumerable.from(this).toArray(), Enumerable.from(arguments).toArray(), message);
            }
        }
        else {
            // "this" is boxed value, can't work strictEqual
            equal(this, expected, message);
        }
    });

    defineToObject("isNot", function (expected, message) {
        if (isCollection(this)) {
            if (arguments.length == 1 && isCollection(expected)) {
                notDeepEqual(Enumerable.from(this).toArray(), expected, message);
            }
            else {
                notDeepEqual(Enumerable.from(this).toArray(), Enumerable.from(arguments).toArray(), message);
            }
        }
        else {
            // "this" is boxed value, can't work strictEqual
            notEqual(this, expected, message);
        }
    });

    defineToObject("catch", function (testCode, message) {
        var error = executeCode(testCode());

        if (error == null) {
            ok(true, message);
        }
        else {
            ok(false, "ErrorMessage:" + error.message + (message != null) ? " Message:" + message : "");
        }

        return error;
    });

    defineToObject("doesNotThrow", function (testCode, message) {
        var error = executeCode(testCode());

        if (error != null) {
            ok(false, "Failed DoesNotThrow. CatchedErrorMessage:" + error.message + (message != null) ? " Message:" + message : "");
        }
    });
})();