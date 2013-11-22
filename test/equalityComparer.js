/// <reference path="qunit.js"/>
/// <reference path="../linq.js" />
/// <reference path="../extensions/linq.qunit.js" />

module("EqualityComparer");

var K1 = function (x) {
    this.item = x;
}

test("defaultComparer", function () {
    var comparer = Enumerable.Utils.getDefaultEqualityComparer();

    comparer.equals(1, 1).isTrue();
    comparer.equals("hoge", "hoge").isTrue();
    comparer.equals(1, 10).isFalse();
    comparer.equals("hoge", "foo").isFalse();

    var d1 = new Date(2010, 10, 10, 10, 10, 10);
    var d2 = new Date(2010, 10, 10, 10, 10, 10);
    comparer.equals(d1, d2).isTrue();

    var k1 = new K1(10);
    var k2 = new K1(10);
    comparer.equals(k1, k2).isFalse();

    var t1 = Enumerable.Utils.createTuple(10);
    var t2 = Enumerable.Utils.createTuple(10);
    comparer.equals(t1, t2).isTrue();

    comparer.getHashCode(1).is("1");
    comparer.getHashCode(true).is("true");
    comparer.getHashCode("hoge").is("hoge");
    comparer.getHashCode(null).is("null");
    comparer.getHashCode(undefined).is("undefined");

    comparer.getHashCode(t1).is("1:10");

    comparer.getHashCode(d1).is("1289412610000");
});

test("customComparer", function () {
    var kComparer = Enumerable.Utils.createEqualityComparer(function (x, y) {
        return x.item === y.item;
    }, function (x) {
        return x.item.toString();
    });
    
    var k1 = new K1(10);
    var k2 = new K1(10);
    
    kComparer.equals(k1, k2).isTrue();
    kComparer.getHashCode(k1).is("10");

    var keyComparer = Enumerable.Utils.createKeyedEqualityComparer(function (x) { return x.item; });
    keyComparer.equals(k1, k2).isTrue();
    keyComparer.getHashCode(k2).is("10");

    var keyExprComparer = Enumerable.Utils.createKeyedEqualityComparer("$.item");
    keyExprComparer.equals(k1, k2).isTrue();
    keyExprComparer.getHashCode(k2).is("10");
});