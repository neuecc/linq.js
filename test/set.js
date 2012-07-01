/// <reference path="testrunner.htm"/>
/// <reference path="~/linq.js" />
/// <reference path="qunit.js"/>

module("Set");

test("All", function ()
{
    var seq = Enumerable.range(1, 10);
    ok(!seq.All("i=>i%2==0"));
    ok(seq.All("i=>i<=10"));
});

test("Any", function ()
{
    var seq = Enumerable.range(1, 10);
    var empty = Enumerable.empty();
    ok(seq.Any());
    ok(!empty.Any());
    ok(seq.Any("$==5"));
    ok(!seq.Any("$==100"));
});

test("Concat", function ()
{
    actual = Enumerable.range(1, 3).Concat([20, 21, 22]).ToArray();
    deepEqual(actual, [1, 2, 3, 20, 21, 22]);
});

test("Insert", function ()
{
    actual = Enumerable.range(1, 5).Insert(3, [20, 21, 22]).ToArray();
    deepEqual(actual, [1, 2, 3, 20, 21, 22, 4, 5]);
});

test("Alternate", function ()
{
    actual = Enumerable.range(1, 5).Alternate(2).ToArray();
    deepEqual(actual, [1, 2, 2, 2, 3, 2, 4, 2, 5]);
    deepEqual(Enumerable.empty().Alternate(2).ToArray(), []);
    deepEqual(Enumerable.make(1).Alternate(2).ToArray(), [1]);
});

test("Contains", function ()
{
    var seq = Enumerable.range(1, 10);
    ok(seq.Contains(5));
    ok(!seq.Contains(13));

    seq = Enumerable.range(1, 10).Select("{test:$%2}");
    ok(seq.Contains(1, "$.test"));
    ok(!seq.Contains(3, "$.test"));
});

test("DefaultIfEmpty", function ()
{
    actual = Enumerable.range(1, 10).DefaultIfEmpty(199).ToArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    actual = Enumerable.empty().DefaultIfEmpty(199).ToArray();
    deepEqual(actual, [199]);
});

test("Distinct", function ()
{
    actual = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9]).Distinct().ToArray();
    deepEqual(actual, [1, 3, 5, 6, 4, 2, 9]);
    actual = Enumerable.range(1, 10).Select("{test:$%2}").Distinct("$.test").ToArray();
    deepEqual(actual, [{ test: 1 }, { test: 0}]);
});

test("Except", function ()
{
    actual = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9])
        .Except([4, 6, 2, 7, 8, 10, 11])
        .ToArray();
    deepEqual(actual, [1, 3, 5, 9]);
    actual = Enumerable.range(1, 10).Select("{test:$%3}")
        .Except(Enumerable.range(1, 10).Select("{test:$%2}"), "$.test")
        .ToArray();
    deepEqual(actual, [{ test: 2}]);
});

test("Intersect", function ()
{
    actual = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9])
        .Intersect([4, 6, 2, 7, 8, 10, 11])
        .ToArray();
    deepEqual(actual, [6, 4, 2]);
    actual = Enumerable.range(1, 10).Select("{test:$%3}")
        .Intersect(Enumerable.range(1, 10).Select("{test:$%2}"), "$.test")
        .ToArray();
    deepEqual(actual, [{ test: 1 }, { test: 0}]);
});

test("SequenceEqual", function ()
{
    ok(!Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9]).SequenceEqual([1, 3, 5]));
    ok(Enumerable.range(1, 10).SequenceEqual(Enumerable.range(1, 10)));

    ok(!Enumerable.range(1, 10).Select("{test:$%3}")
        .SequenceEqual(Enumerable.range(1, 10).Select("{test:$%2}"), "$.test"));

    ok(Enumerable.range(1, 10)
        .Select("{test:$%3}")
        .Distinct("$.test")
        .SequenceEqual([{ test: 1 }, { test: 2 }, { test: 0}], "$.test"));
});

test("Union", function ()
{
    actual = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9])
        .Union([4, 6, 2, 7, 8, 10, 11])
        .ToArray();
    deepEqual(actual, [1, 3, 5, 6, 4, 2, 9, 7, 8, 10, 11]);
    actual = Enumerable.range(1, 3).Select("{test:$}")
        .Union(Enumerable.range(2, 3).Select("{test:$}"), "$.test")
        .ToArray();
    deepEqual(actual, [{ test: 1 }, { test: 2 }, { test: 3 }, { test: 4}]);
});