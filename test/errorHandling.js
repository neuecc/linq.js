/// <reference path="testrunner.htm"/>
/// <reference path="~/linq.js" />
/// <reference path="qunit.js"/>

module("ErrorHandling");

test("catchError", function ()
{
    var msg;
    actual = Enumerable.range(1, 10)
        .select(function (i)
        {
            if (i == 5) throw new Error("aiueo");
            return i;
        })
        .catchError(function (e)
        {
            msg = e.message;
        })
        .toArray();
    deepEqual(actual, [1, 2, 3, 4]);
    equal(msg,"aiueo");
});

test("finallyAction", function ()
{
    var msg;
    actual = Enumerable.range(1, 10)
        .select(function (i)
        {
            if (i == 5) throw new Error("aiueo");
            return i;
        })
        .catchError(function (e)
        {
            msg = e.message;
        })
        .finallyAction(function (f)
        {
            msg += "f";
        })
        .toArray();
    deepEqual(actual, [1, 2, 3, 4]);
    equal(msg, "aiueof");
});