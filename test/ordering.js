/// <reference path="testrunner.htm"/>
/// <reference path="~/linq.js" />
/// <reference path="qunit.js"/>

module("Ordering");

var list = [
    { a: 2, b: 4, c: 1 },
    { a: 2, b: 3, c: 7 },
    { a: 6, b: 6, c: 3 },
    { a: 4, b: 4, c: 5 },
    { a: 7, b: 3, c: 2 },
    { a: 4, b: 4, c: 3 }
];

var strlist = [
    { a: "a", b: "z", c: "b" },
    { a: "z", b: "e", c: "e" },
    { a: "n", b: "d", c: "q" },
    { a: "a", b: "c", c: "k" },
    { a: "n", b: "d", c: "o" }
];

test("orderBy", function ()
{
    actual = Enumerable.from([1, 51, 7, 823, 85, 31, 51, 99])
        .orderBy("i=>i")
        .toArray();
    deepEqual(actual, [1, 7, 31, 51, 51, 85, 99, 823]);
});

test("orderByDescending", function ()
{
    actual = Enumerable.from([1, 51, 7, 823, 85, 31, 51, 99])
        .orderByDescending("i=>i")
        .toArray();
    deepEqual(actual, [823, 99, 85, 51, 51, 31, 7, 1]);
});

test("thenBy", function ()
{
    actual = Enumerable.from(list)
        .orderBy("l=>l.a")
        .thenBy("l=>l.b")
        .thenBy("l=>l.c")
        .toArray();
    expected = [
        { a: 2, b: 3, c: 7 },
        { a: 2, b: 4, c: 1 },
        { a: 4, b: 4, c: 3 },
        { a: 4, b: 4, c: 5 },
        { a: 6, b: 6, c: 3 },
        { a: 7, b: 3, c: 2 }
    ];
    deepEqual(actual, expected);

    actual = Enumerable.from(strlist)
        .orderBy("l=>l.a")
        .thenBy("l=>l.b")
        .thenBy("l=>l.c")
        .toArray();
    expected = [
        { a: "a", b: "c", c: "k" },
        { a: "a", b: "z", c: "b" },
        { a: "n", b: "d", c: "o" },
        { a: "n", b: "d", c: "q" },
        { a: "z", b: "e", c: "e" }
    ];
    deepEqual(actual, expected);
});

test("thenByDescending", function ()
{
    actual = Enumerable.from(list)
        .orderByDescending("l=>l.a")
        .thenByDescending("l=>l.b")
        .thenByDescending("l=>l.c")
        .toArray();
    expected = [
        { a: 7, b: 3, c: 2 },
        { a: 6, b: 6, c: 3 },
        { a: 4, b: 4, c: 5 },
        { a: 4, b: 4, c: 3 },
        { a: 2, b: 4, c: 1 },
        { a: 2, b: 3, c: 7 }
    ];
    deepEqual(actual, expected);

    actual = Enumerable.from(strlist)
        .orderByDescending("l=>l.a")
        .thenByDescending("l=>l.b")
        .thenByDescending("l=>l.c")
        .toArray();
    expected = [
        { a: "z", b: "e", c: "e" },
        { a: "n", b: "d", c: "q" },
        { a: "n", b: "d", c: "o" },
        { a: "a", b: "z", c: "b" },
        { a: "a", b: "c", c: "k" }
    ];
    deepEqual(actual, expected);
});

test("reverse", function ()
{
    actual = Enumerable.from([1, 51, 7, 823, 85, 31, 51, 99])
        .reverse()
        .toArray();
    deepEqual(actual, [99, 51, 31, 85, 823, 7, 51, 1]);
});

test("shuffle", function ()
{
    var array = [1, 51, 7, 823, 85, 31, 51, 99];
    var shuffled = Enumerable.from(array).shuffle().toArray();
    notDeepEqual(shuffled, array, "random test. if failed retry");
});