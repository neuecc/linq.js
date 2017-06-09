linq.js
===
LINQ for JavaScript.

Info
---
Archive, import from Codeplex.

I recommend use fork version - [mihaifm/linq](https://github.com/mihaifm/linq)

Features
---
* implement all .NET 4.0 methods and many extra methods (inspired from Rx, Haskell, Ruby, etc...)
* complete lazy evaluation
* full IntelliSense support for VisualStudio
* two versions - linq.js and jquery.linq.js (jQuery plugin)
* support Windows Script Host
* binding for Reactive Extensions for JavaScript(RxJS) and IntelliSense Generator -> see [documentation]
* NuGet install support - [linq.js](http://nuget.org/List/Packages/linq.js), [linq.js-jQuery](http://nuget.org/List/Packages/linq.js-jQuery), [linq.js-Bindings](http://nuget.org/List/Packages/linq.js-Bindings)

90 Methods
---
Aggregate, All, Alternate, Any, Average, BufferWithCount, CascadeBreadthFirst, CascadeDepthFirst, Catch, Choice, Concat,
Contains, Count, Cycle, DefaultIfEmpty, Distinct, Do, ElementAt, ElementAtOrDefault, Empty, Except, Finally, First, FirstOrDefault, 
Flatten, ForEach, Force, From, Generate, GetEnumerator, GroupBy, GroupJoin, IndexOf, Insert, Intersect, Join, Last, LastIndexOf,
LastOrDefault, Let, Matches, Max, MaxBy, MemoizeAll, Min, MinBy, OfType, OrderBy, OrderByDescending, Pairwise, PartitionBy, 
Range, RangeDown, RangeTo, Repeat, RepeatWithFinalize, Return, Reverse, Scan, Select, SelectMany, SequenceEqual, Share, Shuffle,
Single, SingleOrDefault, Skip, SkipWhile, Sum, Take, TakeExceptLast, TakeFromLast, TakeWhile, ThenBy, ThenByDescending, ToArray,
ToDictionary, ToInfinity,ToJSON, ToLookup, ToNegativeInfinity, ToObject, ToString, Trace, Unfold, Union, Where, Write, WriteLine, Zip

* see details - [linq.js Reference & LINQPad](http://neue.cc/reference.htm)

Starting linq.js ver.3.0.0-beta!(2012/07/19)
---
Get v3 branch or NuGet Install-Package linq.js -Pre, linq.js-jQuery -Pre,  linq.js-RxJS -Pre, linq.js-QUnit -Pre

All methods becomes lower-camel-case.

Query objects or json
---
* sample from http://twitter.com/statuses/public_timeline.json

```js
var jsonArray = [
    { "user": { "id": 100, "screen_name": "d_linq" }, "text": "to objects" },
    { "user": { "id": 130, "screen_name": "c_bill" }, "text": "g" },
    { "user": { "id": 155, "screen_name": "b_mskk" }, "text": "kabushiki kaisha" },
    { "user": { "id": 301, "screen_name": "a_xbox" }, "text": "halo reach" }
]
// ["b_mskk:kabushiki kaisha", "c_bill:g", "d_linq:to objects"]
var queryResult = Enumerable.From(jsonArray)
    .Where(function (x) { return x.user.id < 200 })
    .OrderBy(function (x) { return x.user.screen_name })
    .Select(function (x) { return x.user.screen_name + ':' + x.text })
    .ToArray();
// shortcut! string lambda selector
var queryResult2 = Enumerable.From(jsonArray)
    .Where("$.user.id < 200")
    .OrderBy("$.user.screen_name")
    .Select("$.user.screen_name + ':' + $.text")
    .ToArray();
```

High compatibility with C# Linq
---
```js
// C# LINQ (delegate)
Enumerable.Range(1, 10)
    .Where(delegate(int i) { return i % 3 == 0; })
    .Select(delegate(int i) { return i * 10; });
// linq.js - anonymous function
Enumerable.Range(1, 10)
    .Where(function(i) { return i % 3 == 0; })
    .Select(function(i) { return i * 10; });
// C# LINQ (lambda)
Enumerable.Range(1, 10).Where(i => i % 3 == 0).Select(i => i * 10);
// linq.js - lambda expression
Enumerable.Range(1, 10).Where("i => i % 3 == 0").Select("i => i * 10");
// $ is default iterator variable like Scala's "_" or Groovy's "it"
Enumerable.Range(1, 10).Where("$ % 3 == 0").Select("$ * 10");
 // "" is shorthand of "x => x" (identity function)
Enumerable.Range(4, 7).Join(Enumerable.Range(8, 5), "", "", "outer,inner=>outer*inner");

// Enumerable.From is wrap from primitive array, string(to charArray), object(to KeyValuePair[]) etc..
var array = [100, 200, 30, 40, 500, 40, 200];
var ex1 = Enumerable.From(array).Distinct().ToArray(); // [100, 200, 30, 40, 500]
var ex2 = Enumerable.From("foobar").ToArray(); // ["f", "o", "o", "b", "a", "r"];
var ex3 = Enumerable.From({foo:10, bar:20}).ToArray(); // [{Key:"foo",Value:10}, {Key:"bar",Value:20}]

// C# - AnonymousType
array.Select((val, i) => new { Value = val, Index = i });
// linq.js - object literal
Enumerable.From(array).Select("val,i=>{Value:val, Index:i}")
```

jQuery plugin version
---
```js
// $.Enumerable
$.Enumerable.Range(1, 10).Where("$%2==0").ForEach("alert($)");

// TojQuery - Enumerable to jQuery
$.Enumerable.Range(1, 10)
    .Select(function (i) { return $("<option>").text(i)[0] })
    .TojQuery()
    .appendTo("#select1");

// toEnumerable - jQuery to Enumerable
var sum = $("#select1").children()
    .toEnumerable()
    .Select("parseInt($.text())")
    .Sum(); // 55
```

![image](https://cloud.githubusercontent.com/assets/46207/24585128/c33a4cd4-17bd-11e7-96b3-f098c8d67e81.png)

IntelliSense vsdoc
---
![image](https://cloud.githubusercontent.com/assets/46207/24585136/d328837c-17bd-11e7-939c-3a31d8b83940.png)

with Windows Script Host
---
```js
// get folder name and file name...

var dir = WScript.CreateObject("Scripting.FileSystemObject").GetFolder("C:\\");
 
// normally
var itemNames = [];
for (var e = new Enumerator(dir.SubFolders); !e.atEnd(); e.moveNext())
{
    itemNames.push(e.item().Name);
}
for (var e = new Enumerator(dir.Files); !e.atEnd(); e.moveNext())
{
    itemNames.push(e.item().Name);
}

// linq.js
var itemNames2 = Enumerable.From(dir.SubFolders).Concat(dir.Files).Select("$.Name").ToArray();
```
