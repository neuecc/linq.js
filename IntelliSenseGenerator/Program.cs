using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.IO;
using System.Text.RegularExpressions;

namespace IntelliSenseGenerator
{
    static class Program
    {
        static void Main(string[] args)
        {
            // add reference and replace dll path
            var assembly = Assembly.LoadFrom(@"Interop.IWshRuntimeLibrary.dll");
            var types = assembly.GetTypes();

            var enums = types
                .Where(t => t.IsEnum)
                .OrderBy(t => t.Name)
                .Select(t => string.Format("{0}: \r\n{{\r\n{1}\r\n}}",
                    t.Name,
                    Enum.GetNames(t).Select(s => string.Format("\t{0}: {1}", s, (int)Enum.Parse(t, s))).Join(",\r\n")));

            var classes = types
                .Where(t => t.IsClass)
                .Select(type =>
                {
                    var bindingFlag = BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly;

                    var properties = type.GetProperties(bindingFlag)
                        .OrderBy(pi => pi.Name)
                        .Select(pi => string.Format("{0}: {1}", pi.Name, pi.PropertyType.Name));
                        // .Select(pi => string.Format("{0}: null", pi.Name));

                    var methods = type.GetMethods(bindingFlag)
                        .Where(mi => !mi.IsSpecialName && mi.Name != "GetEnumerator")
                        .Select(mi => new { mi.Name, Parameters = mi.GetParameters(), ReturnType = mi.ReturnType.Name })
                        .OrderBy(t => t.Name)
                        .Select(t => string.Format("{0}: function({1})\r\n{{\r\n{2}\t/// <returns type=\"{3}\"></returns>\r\n}}",
                            t.Name,
                            t.Parameters.Select(pi => pi.Name).Join(", "),
                            t.Parameters.Select(pi => string.Format("\t/// <param name=\"{0}\" type=\"{1}{2}\"></param>\r\n",
                                    pi.Name,
                                    (pi.IsOptional) ? "Optional:" : "",
                                    pi.ParameterType.Name.Replace("Void", "void").Replace("Int32", "Number")))
                                .Join(""),
                            t.ReturnType.Replace("Void", "void").Replace("Int32", "Number")));

                    var result = properties.Concat(methods).Join(",\r\n");
                    return string.Format("{0} = function() {{ }}\r\n{0}.prototype =\r\n{{\r\n{1}\r\n}}",
                        Regex.Replace(type.Name, "Class$", ""),
                        result.Split(new string[] { "\r\n" }, StringSplitOptions.None).Select(s => "\t" + s).Join("\r\n"));
                });

            var name = assembly.GetName().Name.Split('.').Last();
            File.WriteAllText(name + "_enum.js", string.Format("{0}Enum =\r\n{{\r\n{1}\r\n}}", name,
                enums.Join(",\r\n").Split(new string[] { "\r\n" }, StringSplitOptions.None).Select(s => "\t" + s).Join("\r\n")), Encoding.UTF8);
            File.WriteAllText(name + "_class.js", classes.Join("\r\n\r\n"), Encoding.UTF8);
        }

        static string Join<T>(this IEnumerable<T> source, string separator)
        {
            var index = 0;
            return source.Aggregate(new StringBuilder(),
                    (sb, o) => (index++ == 0) ? sb.Append(o) : sb.AppendFormat("{0}{1}", separator, o))
                .ToString();
        }
    }
}
