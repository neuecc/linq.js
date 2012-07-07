What is this?

generate rx-vsdoc.js from RxJS.dll and RxJS.xml

How to use

1. RxJS.dll and RxJS.xml put in same directory with RxVSDocGenerator.exe
2. execute RxVSDocGenerator.exe
3. generated rx-vsdoc.js
* This program required over .NET Framework 3.5

Notice:
There are some problems in vsdoc.
for example,
Publish()'s return type is Rx.ConnectableObservable,
Publish(selector)'s return type is Rx.Observable.
But vsdoc IntelliSense does not support two return types.

--

use library - Cecil
http://www.mono-project.com/Cecil