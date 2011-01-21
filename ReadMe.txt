/*--------------------------------------------------------------------------
* linq.js - LINQ for JavaScript
* ver 2.2.0.2 (Jan. 21th, 2011)
*
* created and maintained by neuecc <ils@neue.cc>
* licensed under Microsoft Public License(Ms-PL)
* http://neue.cc/
* http://linqjs.codeplex.com/
*--------------------------------------------------------------------------*/

Features
* implement all .NET 4.0 methods and many extra methods (inspiration from Rx, Achiral, Haskell, Ruby, etc...)
* complete lazy evaluation
* Full IntelliSense support for VisualStudio
* two versions - linq.js(Normal) and jquery.linq.js(jQuery plugin)
* support Windows Script Host
* binding for Reactive Extensions for JavaScript(RxJS)
* NuGet install support(linq.js, linq.js-jQuery, linq.js-Bindings)

Tutorial

linq.js
---
    <script type="text/javascript" src="linq.js"></script>
    <script type="text/javascript">
        // load linq.js -> Enumerable
        Enumerable.Range(1,10)....
    </script>

jQuery.linq.js (jQuery plugin)
---
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="jquery.linq.js"></script>
    <script type="text/javascript">
        // load jquery.linq.js -> $.Enumerable
        $.Enumerable.Range(1,10)....
    </script>

    jQuery plugin version is added two methods.
    * Enumerable.prototype.TojQuery (Enumerable to jQuery object)
    * jQuery.prototype.toEnumerable (jQuery object to Eunmerable)

bindings/linq.jquery.js
---
    <script type="text/javascript" src="linq.js"></script>
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="linq.jquery.js"></script>
    <script type="text/javascript">
        Enumerable.Range(1,10).TojQuery()...
    </script>
    
    jQuery Bindings added two methods(TojQuery and toEnumerable)
    There are same as plugin version.

binding/linq.rx.js
---
    more tutorial see linq.js CodePlex's Documentation
    
    <script type="text/javascript" src="rx.js"></script>
    <script type="text/javascript" src="linq.js"></script>
    <script type="text/javascript" src="linq.rx.js"></script>

    or
    
    <script type="text/javascript" src="rx.js"></script>
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="jquery.linq.js"></script>
    <script type="text/javascript" src="linq.rx.js"></script>

-vsdoc.js
---
    Visual Studio 2010 - as is.
    Visual Studio 2008 - install SP1 and Patch KB958502.

    linq-vsdoc.js(or jquery.linq-vsdoc.js) puts in same directory.

    if not html then write xml referrence tag on top.
    for example
    /// <reference path="linq.js" />

for Windows Script Host
---
    create wsf file.
    example

    <job id="Main">
        <script language="JScript" src="linq.js"></script>
        <script language="JScript">
            var dir = WScript.CreateObject("Scripting.FileSystemObject").GetFolder("C:\\");

            var itemNames = Enumerable.From(dir.SubFolders)
                .Concat(dir.Files)
                .Select("$.Name")
                .ToArray();
        </script>
    </job>

How to use CodeSnippets
---
    open Visual Studio 2010's Code Snippet Manager(Ctrl+K, Ctrl+B)
    click import button and select snippets/*.snippet

    func0 = function () { return /*cursor*/}
    func1 = function (x) { return /*cursor*/}
    func2 = function (x, y) { return /*cursor*/}
    action0 = function () { /*cursor*/}
    action1 = function (x) { /*cursor*/}
    action2 = function (x, y) { /*cursor*/}
    efrom = Enumerable.From()
    erange = Enumerable.Range()
    jqfrom = $.Enumerable.From()
    jqrange = $.Enumerable.Range()

// history

2011-01-21 ver 2.2.0.2
    Add
        bindings/linq.jquery.js
    Info
         NuGet Package Added to NuGet Gallery

2011-01-18 ver 2.2.0.1
    Change
        ToObservable(linq.rx.js) receive scheduler
        OrderBy optimized performance
        minifier/jQuery genereted by F# Script
    Bug Fix
        remove two not declared var

2010-06-28 ver 2.2.0.0
    Add Method
        TakeFromLast
        ToJSON
    Add File
        rewrite all tests from JSUnit to QUnit
        binding for RxJS(Reactive Extensions for JavaScript)
        add RxVSDocGenerator(rx-vsdoc.js generator for RxJS)
        add code snippets for Visual Studio
    Change
        wrap array (Enumerable.From(array)) optimized performance
        Grouping optimized performance
        Enumerable.From(array)'s array allow function element
        if TakeExceptLast's count under 0 then return all sequence
        add default iterator variable's second, third, fourth($$, $$$, $$$$)
    Bug Fix
        MemoizeAll can't work when sequence contains undefined
        Sum can't work when sequence is empty(fixed return 0)
        vsdoc's Grouping elementSelector is short of summary

2010-05-18 ver 2.1.0.0
    Add Class
        Dictionary
        Lookup
        Grouping
        OrderedEnumerable

    Add Method
        ToDictionary
        MemoizeAll
        Share
        Let

    Add Overload
        Join (compareKey)
        GroupJoin (compareKey)
        GroupBy (compareKey)
        PartitionBy (compareKey)
        ToLookup (compareKey)

    Breaking Change
        return type of ToLookup -> from Array to Lookup
        Enumerate type of GroupBy,PartitionBy -> from KeyValuePair to Grouping

    Change
        implimentation of OrderBy/ThenBy changed CLR compatible (maybe...)

    Bug Fix
        GroupBy Key auto converts to string
        All set methods do not distinction between boolean and string and number
        Scan and All Paging Methods do not work if sequence contains undefined

2010-04-23 ver 2.0.0.0
    all code rewrite from scratch.
    enumerator support Dispose.

    namespace changed
        E, Linq.Enumerable -> Enumerable

    delete methods
        ToJSON
        ToTable
        TraceF
        RangeDownTo

    rename methods
        ZipWith -> Zip
        Slice -> BufferWithCount
        Times -> Generate

    change methods
        From (add argument - WSH's IEnumerable)
        Trace (write to console.log)
        RangeTo (contains downto)
        OrderBy/ThenBy (support string sort)

    add methods
        MaxBy
        MinBy
        OfType
        Catch
        Finally
        PartitionBy
        Alternate
        TakeExceptLast
        RepeatWithFinalize

    add files
        jquery.linq.js
        and minifier file by Microsoft Ajax Minifier(-HC)

    delete files
        linq.xml.js (move to branches)
        linq.tools.js (move to branches and rename linq.utils.js)

2009-06-15 ver 1.3.0.2
    Add Make, CascadeDepthFirst/CascadeBreadthFirst.
    ForEach support continue/break.

2009-06-05 ver 1.3.0.1
    IntelliSense Support.
    dom functional construction(Linq to Xml).

2009-05-24 ver 1.3.0.0
    Add - Unfold, Matches, Insert, IndexOf, LastIndexOf
    Change - From<String>
    Add linq.tools.js - Stopwatch.Bench, StringBuilder.Reverse, HashSet

2009-05-17 ver 1.2.0.3
    Add linq.tools.js - Stopwatch, DateUtility.IsLeapYear, DateUtility.DaysInMonth

2009-05-16 ver 1.2.0.2
    Add new Sample - linq.tools.js

2009-05-07 ver 1.2.0.1
    FixBug - ToJSON
    Add - Times
    Add Overload step - Range, RangeDown, RangeTo, RangeDownTo, ToInfinity, ToNegativeInfinity

2009-04-26 ver 1.2.0.0
    FixBug - Set Operations(Disctint,Union,Intersect,Except)
    FixBug - ToJSON
    Add compareSelector - Contains, Distinct, Except, Intersect, SequenceEqual, Union

2009-04-19 ver 1.1.0.0
    Add new Sample - linqfader
    Add linq.xml.js

2009-04-10 ver 1.0.0.1
    Add - Choice
    Add - RangeTo
    Add - RangeDownTo
    Fix - Cycle

2009-04-04
    1st Release