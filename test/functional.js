/// <reference path="testrunner.htm"/>
/// <reference path="~/linq.js" />
/// <reference path="qunit.js"/>

module("Functional");

test("letBind", function ()
{
    var sum = Enumerable.range(1, 10)
        .letBind(function (e)
        {
            return e.zip(e, function (a, b) { return { a: a, b: b} });
        })
        .select("$.a + $.b")
        .sum();
    equal(sum, 110);
});

test("share", function ()
{
    var share = Enumerable.range(1, 10).share();
    var ar1 = share.take(4).toArray();
    var ar2 = share.toArray();
    var ar3 = share.toArray();
    deepEqual(ar1, [1, 2, 3, 4]);
    deepEqual(ar2, [5, 6, 7, 8, 9, 10]);
    deepEqual(ar3, []);
});

test("memoize", function ()
{
    var count = 0;
    var mem = Enumerable.range(1, 5)
        .select(function (x) { count++; return x; })
        .memoize();
    var ar1 = mem.toArray();
    var ar2 = mem.toArray();
    deepEqual(ar1, [1, 2, 3, 4, 5]);
    deepEqual(ar2, [1, 2, 3, 4, 5]);
    equal(5, count);

    mem = Enumerable.from([1, 2, undefined, 3, 4])
        .memoize();

    ar1 = mem.toArray();
    ar2 = mem.toArray();
    deepEqual(ar1, [1, 2, undefined, 3, 4]);
    deepEqual(ar2, [1, 2, undefined, 3, 4]);
});