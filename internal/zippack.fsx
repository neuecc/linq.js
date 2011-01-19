// archive zip for release package
#r "lib\Ionic.Zip.dll"

open System
open System.IO
open System.Text.RegularExpressions
open Ionic.Zip

let rootDir = (new DirectoryInfo(__SOURCE_DIRECTORY__)).Parent
let pathSubtract pathbase target = 
    Regex.Replace(target, "^" + Regex.Escape(pathbase), "")

// traverse files
let top = 
    rootDir.EnumerateFiles()
    |> Seq.filter (fun x -> Regex.IsMatch(x.Name, "^.*\.(js|txt|htm)$"))

let sub = 
    let allowDirs = Set(["bindings"; "sample"; "snippets"; "test" ])
    let ignoreFiles = Set(["testrunner.jquery.htm"; "testrunner.jquery.min.htm"; "testrunner.min.htm"]) 
    rootDir.EnumerateDirectories()
    |> Seq.filter (fun x -> allowDirs.Contains x.Name)
    |> Seq.collect (fun x -> x.EnumerateFiles("*", SearchOption.AllDirectories))
    |> Seq.filter (fun x -> not (ignoreFiles.Contains x.Name ))

// compress
do
    use zip = new ZipFile()
    for x in (Seq.append top sub) do
        zip.AddFile(x.FullName, pathSubtract rootDir.FullName x.DirectoryName) |> ignore
    Path.Combine(__SOURCE_DIRECTORY__, "archive.zip") |> zip.Save