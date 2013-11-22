
var Enumerable = require('../linq.js');


    var seq = Enumerable.range(1, 10).select("{test:$%2}");
var xx = seq.contains(1, function(x){ 
    return x.test;
});
    var xxx = seq.contains(1, "$.test");

var _ = 1;