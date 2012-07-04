/// <reference path="testrunner.htm"/>
/// <reference path="~/linq.js" />
/// <reference path="qunit.js"/>
/// <reference path="~/bindings/linq.qunit.js" />


Enumerable.range(1, 10).take(10);

module("WhereSelectEnumerable");

var seq = Enumerable.range(5, 10); // 5-14
var seq2 = Enumerable.range(5, 5); // 5-9

test("where", function () {
    seq.where("$%2==0").is(6, 8, 10, 12, 14);
    seq.where("$$%2==0").is(5, 7, 9, 11, 13);
});

test("select", function () {
    seq2.select("$*10").is(50, 60, 70, 80, 90);
    seq2.select("$$*2").is(0, 2, 4, 6, 8);
});

test("wherewhere", function () {
    seq.where("$%2==0").where("$%3==0").is(6, 12);
    seq.where("$$%2==0").where("$$%2==0").is(5, 9, 13);
    seq.where("$%2==0").where("$$%2==0").is(6, 10, 14);
    seq.where("$$%2==0").where("$%3==0").is(9);
});

test("selectselect", function () {
    seq2.select("$*10").select("$*2").is(100, 120, 140, 160, 180);
    seq2.select("$$*2").select("$+$$*20").is(0, 22, 44, 66, 88);
    seq2.select("$*10").select("$+$$*2").is(50, 62, 74, 86, 98);
    seq2.select("$$*2").select("$*10").is(0, 20, 40, 60, 80);
});

test("whereselect", function() {
    seq.where("$%2==0").select("$*2").is(12, 16, 20, 24, 28);
});

test("selectwhere", function () {
    seq.select("$*2").where("$%2==0").is(10, 12, 14, 16, 18, 20, 22, 24, 26, 28);
});

test("whereselectwhere", function () {

});

test("selectwhereselect", function () {

});

test("wherewhereselectwhere", function () {

});

test("selectselectwhereselect", function () {

});