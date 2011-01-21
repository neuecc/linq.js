open System
open System.IO
open System.Text
open System.Diagnostics

// working...

let args = ["-jar", "lib/compiler.jar";
            "--compilation_level", "ADVANCED_OPTIMIZATIONS";
            "--warning_level", "VERBOSE";
            "--externs", "externs.js";
            "--jscomp_error", "checkTypes"
            "--js_output_file", "linq.closureoptimization.js"];



let inputs =
    ["../linq.js"; "test.js"]
    |> List.map (fun x -> ("--js", x))

new ProcessStartInfo(
    FileName = "java",
    Arguments = (args @ inputs |> Seq.map (fun (x,y) -> x + " " + y) |> String.concat " "),
    RedirectStandardOutput = true,
    UseShellExecute = false,
    WorkingDirectory = __SOURCE_DIRECTORY__)
|> Process.Start
|> fun p -> Console.WriteLine(p.StandardOutput.ReadToEnd())