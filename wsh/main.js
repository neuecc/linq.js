/// <reference path="linq.js" />
/// <reference path="linq.tools.js" />
/// <reference path="linq.wsh.js" />
debugger


//var r = E.Times("T.Math.Rand(0, 50)", 100000)
// .GroupBy("$")
// .OrderBy("$.Key")
// .Select("$.Key + ':' + $.Value.Count()")
// .ToString("\r\n");

//W.Echo(r);
var f = W.CreateFileSystem().GetFile("C:\\Users\\neuecc\\Documents\\Tools\\utility\\QTtabbar\\CreateNewItemButton.dll");

W.Echo("test");
var b = 1000;

// JScriptでは扱いづらいバイト配列の操作用関数を用意しています。

//// 文字列からバイト変換
//// Numberの配列からバイト配列への変換も可能
//var bytes = W.Bytes.ToBytesFromString("foobar")
//var bytes2 = W.Bytes.ToBytesFromArray([12, 32, 5, 64]);
//// md5の他にSHA1も用意してあります
//var md5 = W.Bytes.ToMD5String(bytes);
//// Base64はToとFrom双方を用意
//var base64str = W.Bytes.ToBase64String(bytes);
//var base64bytes = W.Bytes.FromBase64String(base64);

//// そのままでは扱えないバイト配列をNumberのイテレータに変換するToLinq
//// LinqなのでSelectしたりForEachしたり、ToArrayでそのまま配列にも出来る
//var byetNumberArray = W.Bytes.ToLinq(bytes).ToArray();






//// Using Linq with Microsoft Word and Excel
//// http://msmvps.com/blogs/deborahk/archive/
//// 2009/08/14/using-linq-with-microsoft-word-and-excel.aspx
//// WordとExcelでLinqだってー、JScriptの出番ktkr。Missing.Value必要ないし！

//try
//{
//    var excel = W.CreateObject("Excel.Application");
//    excel.Workbooks.Add();
//    excel.ActiveSheet.Name = "Test";

//    // うん。どこからどう見てもLinqだ。
//    var query = E.From(excel.Worksheets).Select("$.Name");

//    query.ForEach("W.Echo($)");
//}
//finally
//{
//    if (excel != null)
//    {
//        excel.DisplayAlerts = false;
//        excel.Quit();
//    }
//}

//// * JScriptでMD5計算をそそくさと行ってみる。

//// 一部の.NET Frameworkのクラス群は利用可能
//var encoding = W.CreateObject("System.Text.UTF8Encoding");
//var md5 = W.CreateObject("System.Security.Cryptography.MD5CryptoServiceProvider");

//// オーバーロード指定は_?で行う
//var bytes = encoding.GetBytes_4("test_string");
//var hash = md5.ComputeHash_2(bytes);

//// 得られるバイト配列はJScript上では原則利用不可能
//// なのでIEnumerable<int>(みたいなもの)への変換メソッドBytes.ToLinqを用意した
//var md5string = W.Bytes.ToLinq(hash)
//    .Aggregate(W.CreateObject("System.Text.StringBuilder"), 
//        "sb,b=>sb.AppendFormat('{0:x}',b)")
//    .ToString();

//W.Echo(md5string);





//var base64str = W.Bytes.ToBase64String(hash);
//var rehash = W.Bytes.FromBase64String(base64str);








//var filePath = "C:\\HogeHoge";

//var allFiles = [];
//(function(folder)
//{
//    for (var e = new Enumerator(folder.SubFolders); !e.atEnd(); e.moveNext())
//    {
//        var item = e.item();
//        if (item.SubFolders.Count != 0) arguments.callee(item);
//        for (var e2 = new Enumerator(item.Files); !e2.atEnd(); e2.moveNext())
//        {
//            allFiles.push(e2.item().Path);
//        }
//    }
//})(WScript.CreateObject("Scripting.FileSystemObject").GetFolder(filePath));


//var root = W.CreateFileSystem().GetFolder(filePath);
//var allFiles = E.From(root.SubFolders)
//    .CascadeDepthFirst("$.SubFolders")
//    .SelectMany("$.Files", "folder,file => file.Path")
//    .ToArray();


//var shell = W.CreateShell();
//// W.Key.Popup.Button/Icon/Resultに定数が格納してあります
//// 全部に記述するのは面倒くさいので、こういうのは素直にwithで
//// ちゃんとIntelliSenseも動きます、VisualStudioは賢いなあ
//with (W.Key.Popup)
//{
//    var result = shell.Popup("「はい」「いいえ」「キャンセル」", 5,
//        "MessageBox", Button.YesNoCancel + Icon.Question);
//    switch (result)
//    {
//        case Result.Timeout:
//            shell.Popup("タイムアウト", 0, "", Icon.Critical);
//            break;
//        case Result.Yes:
//            shell.Popup("はい", 0, "", Icon.Exclamation);
//            break;
//        case Result.No:
//            shell.Popup("いいえ", 0, "", Icon.Information);
//            break;
//        case Result.Cancel:
//            shell.Popup("キャンセル");
//            break;
//    }
//}


//var fs = W.CreateFileSystem();

//// 今までこんな感じでダルい
//try
//{
//    var stream = fs.CreateTextFile("C:\\hoge.txt");
//    stream.WriteLine("hoge");
//}
//finally
//{
//    stream.Close();
//}

//// C#のUsing風のメソッドを用意してみた
//// Closeメソッドが実装されていること大前提の決め打ちですが、
//// まあ、WSHのStream用なのでほとんど問題ないでせう、きっと。
//W.Using(fs.CreateTextFile("C:\\hoge.txt"), function(ts)
//{
//    ts.WriteLine("hoge");
//});