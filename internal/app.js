
var Enumerable = require('../linq.js');




var list = Enumerable.empty().toList();

list.push(100);
list.push(200);
list.push(300);
list.push(400);
list.push(500);

var l = list.last();

list.reverse().forEach(console.log);

var x = list[0];

var z = list.last();
console.log(list.last());

var _ = 1;