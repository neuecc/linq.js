/// <reference path="testrunner.htm"/>
/// <reference path="~/linq.js" />
/// <reference path="qunit.js"/>

module("ErrorHandling");

test("tryCatch", function ()
{
    var msg;
    actual = Enumerable.range(1, 10)
        .select(function (i)
        {
            if (i == 5) throw new Error("aiueo");
            return i;
        })
        .tryCatch(function (e)
        {
            msg = e.message;
        })
        .toArray();
    deepEqual(actual, [1, 2, 3, 4]);
    equal(msg,"aiueo");
});

test("tryFinally", function ()
{
    var msg;
    actual = Enumerable.range(1, 10)
        .select(function (i)
        {
            if (i == 5) throw new Error("aiueo");
            return i;
        })
        .tryCatch(function (e)
        {
            msg = e.message;
        })
        .tryFinally(function (f)
        {
            msg += "f";
        })
        .toArray();
    deepEqual(actual, [1, 2, 3, 4]);
    equal(msg, "aiueof");
});