/// <reference path="testrunner.htm"/>
/// <reference path="~/linq.js" />
/// <reference path="qunit.js"/>

module("Paging");

test("elementAt", function () {
    actual = Enumerable.range(1, 10).elementAt(5);
    equal(actual, 6);
});

test("elementAtOrDefault", function () {
    actual = Enumerable.range(1, 10).elementAtOrDefault(3, "foo");
    equal(actual, 4);
    actual = Enumerable.range(1, 10).elementAtOrDefault(31, "foo");
    equal(actual, "foo");
});

test("first", function () {
    actual = Enumerable.range(1, 10).first();
    equal(actual, 1);
    actual = Enumerable.range(1, 10).first("i=>i*3==6");
    equal(actual, 2);
});

test("firstOrDefault", function () {
    actual = Enumerable.range(1, 10).firstOrDefault(4);
    equal(actual, 1);
    actual = Enumerable.range(1, 10).skip(11).firstOrDefault(4);
    equal(actual, 4);

    actual = Enumerable.range(1, 10).firstOrDefault(4, "i=>i*3==6");
    equal(actual, 2);
    actual = Enumerable.range(1, 10).firstOrDefault(40, "i=>i>13");
    equal(actual, 40);
});

test("last", function () {
    actual = Enumerable.range(1, 10).last();
    equal(actual, 10);

    actual = Enumerable.range(1, 10).last("i=>i<6");
    equal(actual, 5);
});

test("lastOrDefault", function () {
    actual = Enumerable.range(1, 10).lastOrDefault(34);
    equal(actual, 10);
    actual = Enumerable.range(1, 10).skip(11).lastOrDefault(34);
    equal(actual, 34);

    actual = Enumerable.range(1, 10).lastOrDefault(4, "i=>i*3<=6");
    equal(actual, 2);
    actual = Enumerable.range(1, 10).lastOrDefault(40, "i=>i>13");
    equal(actual, 40);
});

test("single", function () {
    actual = Enumerable.range(1, 1).single();
    equal(actual, 1);

    actual = Enumerable.range(1, 10).single("i=>i==6");
    equal(actual, 6);
});

test("singleOrDefault", function () {
    actual = Enumerable.range(1, 1).singleOrDefault(34);
    equal(actual, 1);
    actual = Enumerable.range(1, 10).skip(11).singleOrDefault(34);
    equal(actual, 34);

    actual = Enumerable.range(1, 10).singleOrDefault(4, "i=>i*3==6");
    equal(actual, 2);
    actual = Enumerable.range(1, 10).singleOrDefault(40, "i=>i>13");
    equal(actual, 40);
});

test("skip", function () {
    actual = Enumerable.range(1, 10).skip(4).toArray();
    deepEqual(actual, [5, 6, 7, 8, 9, 10]);
});

test("skipWhile", function () {
    actual = Enumerable.range(1, 10).skipWhile("i=>i<8").toArray();
    deepEqual(actual, [8, 9, 10]);

    actual = Enumerable.range(1, 10).skipWhile("v,i=>i<8").toArray();
    deepEqual(actual, [9, 10]);
});

test("take", function () {
    actual = Enumerable.range(1, 10).take(4).toArray();
    deepEqual(actual, [1, 2, 3, 4]);
});

test("takeWhile", function () {
    actual = Enumerable.range(1, 10).takeWhile("i=>i<8").toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7]);

    actual = Enumerable.range(1, 10).takeWhile("v,i=>i<8").toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8]);
});

test("takeExceptLast", function () {
    actual = Enumerable.range(1, 10).takeExceptLast().toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    actual = Enumerable.range(1, 10).takeExceptLast(3).toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7]);
    actual = Enumerable.range(1, 10).takeExceptLast(-1).toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    actual = Enumerable.range(1, 10).takeExceptLast(100).toArray();
    deepEqual(actual, []);
});

test("takeFromLast", function () {
    actual = Enumerable.range(1, 10).takeFromLast(3).toArray();
    deepEqual(actual, [8, 9, 10]);
    actual = Enumerable.range(1, 10).takeFromLast(100).toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    actual = Enumerable.range(1, 10).takeFromLast(0).toArray();
    deepEqual(actual, []);
    actual = Enumerable.range(1, 10).takeFromLast(-10).toArray();
    deepEqual(actual, []);
});

test("indexOf", function () {
    actual = Enumerable.range(1, 10).indexOf(3);
    equal(actual, 2);

    [1, 10, 100, 1000, 100, 100].asEnumerable().indexOf(100).is(2);

    [1, 2, 3, 3, 3, 4, 5].indexOf(3).is(2);
    [1, 2, 3, 3, 3, 4, 5].indexOf(function (x) { return x == 3; }).is(2);
});

test("lastIndexOf", function () {
    actual = Enumerable.from([1, 2, 3, 2, 5]).lastIndexOf(2)
    equal(actual, 3);

    [1, 2, 3, 3, 3, 4, 5].lastIndexOf(3).is(4);
    [1, 2, 3, 3, 3, 4, 5].lastIndexOf(function (x) { return x == 3; }).is(4);
});