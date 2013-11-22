/// <reference path="qunit.js"/>
/// <reference path="../linq.js" />
/// <reference path="../extensions/linq.qunit.js" />

module("list");

test("create", function () {
    var list = Enumerable.Utils.createList();

    // inherit array
    (list instanceof Array).isTrue();

    list.push(1);
    list.push(10);
    list.push(100);

    list.is(1, 10, 100);
    
    // can use Enumerable methods
    list.select("$*$").is(1, 100, 10000);

    // is ArrayEnumerable
    (typeof list.getSource).is("function");
 });