/// <reference path="testrunner.htm"/>
/// <reference path="~/linq.js" />
/// <reference path="qunit.js"/>

module("Enumerable");

test("choice", function ()
{
    actual = Enumerable.choice(1, 10, 31, 42).Take(10).ToArray();
    notEqual(actual, [1, 10, 31, 42, 1, 10, 31, 42, 1, 10], "random test. if failed retry");
    equal(actual.length, 10);

    actual = Enumerable.choice([1, 10, 31, 42]).Take(10).ToArray();
    notEqual(actual, [1, 10, 31, 42, 1, 10, 31, 42, 1, 10], "random test. if failed retry");
    equal(actual.length, 10);
});

test("cycle", function ()
{
    actual = Enumerable.cycle(1, 10, 31, 42).Take(10).ToArray();
    deepEqual(actual, [1, 10, 31, 42, 1, 10, 31, 42, 1, 10]);
    actual = Enumerable.cycle([1, 2, 3, 4, 5]).Take(10).ToArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
});

test("empty", function ()
{
    actual = Enumerable.empty().ToArray();
    deepEqual(actual, []);
});

test("from", function ()
{
    actual = Enumerable.from("temp").ToArray();
    deepEqual(actual, ["t", "e", "m", "p"]);

    actual = Enumerable.from(3).ToArray();
    deepEqual(actual, [3]);

    actual = Enumerable.from([1, 2, 3, 4, 5]).ToArray();
    deepEqual(actual, [1, 2, 3, 4, 5]);

    actual = Enumerable.from({ foo: "bar", func: function () { } }).ToArray();
    deepEqual(actual, [{ Key: "foo", Value: "bar"}]);

    var div = document.createElement("html");
    var last = document.createElement("div");
    last.appendChild(document.createTextNode("test"));
    div.appendChild(document.createElement("div"));
    div.appendChild(document.createElement("div"));
    div.appendChild(last);
    var seq = Enumerable.from(div.getElementsByTagName("div"));
    equal(seq.Count(), 3);
    equal(seq.ElementAt(2), last);
    equal(seq.ElementAt(2).firstChild.nodeValue, "test");
});

test("make", function ()
{
    actual = Enumerable.make("hoge").ToArray();
    deepEqual(actual, ["hoge"]);
});

test("matches", function ()
{
    actual = Enumerable.matches("xbcyBCzbc", /(.)bc/i).Select("$.index+$[1]").ToArray();
    deepEqual(actual, ["0x", "3y", "6z"]);
    actual = Enumerable.matches("xbcyBCzbc", "(.)bc").Select("$.index+$[1]").ToArray(); ;
    deepEqual(actual, ["0x", "6z"]);
    actual = Enumerable.matches("xbcyBCzbc", "(.)bc", "i").Select("$.index+$[1]").ToArray(); ;
    deepEqual(actual, ["0x", "3y", "6z"]);
});

test("range", function ()
{
    actual = Enumerable.range(1, 10).ToArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    actual = Enumerable.range(1, 5, 3).ToArray();
    deepEqual(actual, [1, 4, 7, 10, 13]);
});

test("rangeDown", function ()
{
    actual = Enumerable.rangeDown(1, 10).ToArray();
    deepEqual(actual, [1, 0, -1, -2, -3, -4, -5, -6, -7, -8]);
    actual = Enumerable.rangeDown(1, 5, 3).ToArray();
    deepEqual(actual, [1, -2, -5, -8, -11]);
});

test("rangeTo", function ()
{
    actual = Enumerable.rangeTo(5, 10).ToArray();
    deepEqual(actual, [5, 6, 7, 8, 9, 10]);
    actual = Enumerable.rangeTo(1, 10, 3).ToArray();
    deepEqual(actual, [1, 4, 7, 10]);
    actual = Enumerable.rangeTo(-2, -8).ToArray();
    deepEqual(actual, [-2, -3, -4, -5, -6, -7, -8]);
    actual = Enumerable.rangeTo(-2, -8, 2).ToArray();
    deepEqual(actual, [-2, -4, -6, -8]);
});

test("repeat", function ()
{
    actual = Enumerable.repeat("temp").Take(3).ToArray();
    deepEqual(actual, ["temp", "temp", "temp"]);
    actual = Enumerable.repeat("temp", 5).ToArray();
    deepEqual(actual, ["temp", "temp", "temp", "temp", "temp"]);
});

test("repeatWithFinalize", function ()
{
    var fin;
    actual = Enumerable.repeatWithFinalize(
                    function () { return "temp"; },
                    function () { fin = "final"; })
                .Take(3).ToArray();
    deepEqual(actual, ["temp", "temp", "temp"]);
    equal("final", fin);
});

test("Generate", function ()
{
    actual = Enumerable.Generate(function () { return "temp" }).Take(3).ToArray();
    deepEqual(actual, ["temp", "temp", "temp"]);
    actual = Enumerable.Generate(function () { return "temp" }, 5).ToArray();
    deepEqual(actual, ["temp", "temp", "temp", "temp", "temp"]);
});

test("ToInfinity", function ()
{
    actual = Enumerable.ToInfinity().Where("i=>i%2==0").Take(10).ToArray();
    deepEqual(actual, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
    actual = Enumerable.ToInfinity(101).Take(5).ToArray();
    deepEqual(actual, [101, 102, 103, 104, 105]);
    actual = Enumerable.ToInfinity(101, 5).Take(5).ToArray();
    deepEqual(actual, [101, 106, 111, 116, 121]);
});

test("ToNegativeInfinity", function ()
{
    actual = Enumerable.ToNegativeInfinity().Where("i=>i%2==0").Take(10).ToArray();
    deepEqual(actual, [0, -2, -4, -6, -8, -10, -12, -14, -16, -18]);
    actual = Enumerable.ToNegativeInfinity(3).Take(10).ToArray();
    deepEqual(actual, [3, 2, 1, 0, -1, -2, -3, -4, -5, -6]);
    actual = Enumerable.ToNegativeInfinity(3, 5).Take(4).ToArray();
    deepEqual(actual, [3, -2, -7, -12]);
});

test("Unfold", function ()
{
    actual = Enumerable.Unfold(5, "$+3").Take(5).ToArray();
    deepEqual(actual, [5, 8, 11, 14, 17]);
});