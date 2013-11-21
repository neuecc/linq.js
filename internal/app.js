
var Enumerable = require('../linq.js');



var List = function(){
}
List.prototype = new Array(); 
Enumerable.Utils.extendTo(List);




var list = new List();

list.push(100);
list.push(200);
list.push(300);
list.push(400);
list.push(500);
var x = list[0];

var z = list.last();
console.log(list.last());

var _ = 1;