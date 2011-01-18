// create jQuery plugin and AjaxMin compile and report warnings

#r "lib\AjaxMin.dll"
open System
open System.IO
open System.Text
open Microsoft.Ajax.Utilities

let root = Path.GetDirectoryName(__SOURCE_DIRECTORY__)
let nl = Environment.NewLine
let jq_extend = "jQuery.extend({ Enumerable: (function ()"
let jq_plugin = @"});

(function ($)
{
    $.fn.toEnumerable = function ()
    {
        return $.Enumerable.From(this).Select(function (e) { return $(e) });
    }

    $.Enumerable.prototype.TojQuery = function ()
    {
        return $(this.ToArray());
    }
})(jQuery)"

// read
let linqjs =  Path.Combine(root, "linq.js") |> File.ReadAllLines
let header = String.Join(nl, linqjs |> Seq.takeWhile (fun s -> s.Contains("*")))
let jqbody = 
    let body = linqjs |> Seq.skipWhile (fun s -> s.Contains("*"))
    jq_extend + String.Join(nl, body |> Seq.skipWhile (fun s -> s.Trim() = "" || s.StartsWith("Enumerable"))) + jq_plugin

// minify
let minify source = 
    let minifier = new Minifier(WarningLevel = 3)
    let settings = new CodeSettings(
                        LocalRenaming = LocalRenaming.CrunchAll,
                        OutputMode = OutputMode.SingleLine,
                        IndentSize = 4,
                        CollapseToLiteral = true,
                        CombineDuplicateLiterals = true)
    let allowNames = [|"Enumerable"; "Enumerator"; "JSON"; "console"; "$"; "jQuery"|]
    minifier.MinifyJavaScript(source, settings, allowNames), minifier.Errors

let linqjsMin, errors = minify <| String.Join(nl, linqjs)
let linqjqMin, _ = minify jqbody

// out
let write name body = 
    let path = Path.Combine(root, name)
    File.WriteAllText(path, header + nl + body, Encoding.UTF8)

write "linq.min.js" linqjsMin
write "jquery.linq.js" jqbody
write "jquery.linq.min.js" linqjqMin

// warning printout
errors |> Seq.iter (printfn "%s")