/// <reference path="testrunner.htm"/>
/// <reference path="~/linq.js" />
/// <reference path="qunit.js"/>
/// <reference path="~/extensions/linq.qunit.js" />

module("Tuple");

test("Tuple", function () {
    var tuple1 = Enumerable.Utils.createTuple(1, 2);
    var tuple2 = Enumerable.Utils.createTuple(1, 2);
    var tuple3 = Enumerable.Utils.createTuple(1, 20);

    tuple1.item1.is(1);
    tuple1.item2.is(2);
    tuple3.item1.is(1);
    tuple3.item2.is(20);

    tuple1.equals(tuple2).isTrue();
    tuple1.equals(tuple3).isFalse();

    tuple1.getHashCode().is("1:1-2:2");
    tuple3.getHashCode().is("1:1-2:20");
    
    var combTuple = Enumerable.Utils.createTuple("a", tuple1);
    var combTuple2 = Enumerable.Utils.createTuple("a", tuple1);
    var combTuple3 = Enumerable.Utils.createTuple("b", tuple1);
    var combTuple4 = Enumerable.Utils.createTuple("a", tuple3);
    
    combTuple.equals(combTuple2).isTrue();
    combTuple.equals(combTuple3).isFalse();
    combTuple.equals(combTuple4).isFalse();

    combTuple.getHashCode().is("1:a-2:1:1-2:2");
});

test("TupleArray", function () {
    var tuple1 = Enumerable.Utils.createTupleArray(1, 2);
    var tuple2 = Enumerable.Utils.createTupleArray(1, 2);
    var tuple3 = Enumerable.Utils.createTupleArray(1, 20);

    tuple1.items[0].is(1);
    tuple1.items[1].is(2);
    tuple3.items[0].is(1);
    tuple3.items[1].is(20);

    tuple1.equals(tuple2).isTrue();
    tuple1.equals(tuple3).isFalse();

    tuple1.getHashCode().is("0:1-1:2");
    tuple3.getHashCode().is("0:1-1:20");

    var combTuple = Enumerable.Utils.createTupleArray("a", tuple1);
    var combTuple2 = Enumerable.Utils.createTupleArray("a", tuple1);
    var combTuple3 = Enumerable.Utils.createTupleArray("b", tuple1);
    var combTuple4 = Enumerable.Utils.createTupleArray("a", tuple3);

    combTuple.equals(combTuple2).isTrue();
    combTuple.equals(combTuple3).isFalse();
    combTuple.equals(combTuple4).isFalse();

    combTuple.getHashCode().is("0:a-1:0:1-1:2");

    // multi
    var tuple = Enumerable.Utils.createTupleArray(1, 10, "hoge", true, "huga");

    tuple.items[0].is(1);
    tuple.items[1].is(10);
    tuple.items[2].is("hoge");
    tuple.items[3].is(true);
    tuple.items[4].is("huga");

    var _tuple = Enumerable.Utils.createTupleArray(1, 10, "hoge", true, "huga");

    tuple.equals(_tuple).isTrue();
});