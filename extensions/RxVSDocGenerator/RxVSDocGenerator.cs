using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using Mono.Cecil;

static class RxVSDocGenerator
{
    const string RootNamespace = "Rx";

    static class Template
    {
        /// <summary>0 - FullName</summary>
        public const string Object = @"{0} = {{}}";

        /// <summary>FullName, Parameters, Summary, Param</summary>
        public const string Class = @"
{FullName} = function({Parameters})
{
    /// <summary>{Summary}</summary>
{Param}
}";

        /// <summary>0 - FullName, 1- BaseFullName</summary>
        public const string Inheritance = @"{0}.prototype = new {1};";

        /// <summary>ClassName, MethodName, Parameters, Summary, Param, ReturnsType</summary>
        public const string InstanceFunction = @"
{ClassName}.prototype.{MethodName} = function({Parameters})
{
    /// <summary>{Summary}</summary>
{Param}
    /// <returns type='{ReturnsType}'></returns>
}";

        /// <summary>ClassName, MethodName, Parameters, Summary, Param, ReturnsType</summary>
        public const string StaticFunction = @"
{ClassName}.{MethodName} = function({Parameters})
{
    /// <summary>{Summary}</summary>
{Param}
    /// <returns type='{ReturnsType}'></returns>
}";

        /// <summary>0 - type, 1- name</summary>
        public const string Param = @"    /// <param type='{0}' name='{1}'></param>";

        /// <summary>0 - ClassName, 1- FieldName</summary>
        public const string InstanceField = @"{0}.prototype.{1} = null;";

        /// <summary>0 - ObjectName, 1- FieldName</summary>
        public const string ObjectField = @"{0}.{1} = null;";
    }

    static void Main()
    {
        AppDomain.CurrentDomain.UnhandledException += (sender, e) =>
        {
            Console.WriteLine("Error:put RxJS.dll, RxJS.xml on same directory. or other problem ?");
            Console.WriteLine("press key");
            Console.ReadLine();
        };

        var rxjsTypes = AssemblyFactory.GetAssembly("RxJS.dll")
            .MainModule.Types.Cast<TypeDefinition>()
            .Where(t => t.Namespace == RootNamespace)
            .Where(t => t.IsClass && t.IsPublic)
            .Where(t => t.Name != "XmlHttpRequestDetails")
            .OrderBy(t => t.FullName)
            .ToArray();

        var summaries = XElement.Load("RxJS.xml")
            .Descendants("member")
            .ToDictionary(
                e => e.Attribute("name").Value.Split(':').Last(),
                e => e.Element("summary").Value.RegexReplace("[\r\n]", "").RegexReplace(" +", " ").Trim());

        var classes = rxjsTypes
            .Where(t => t.Constructors.Count > 0)
            .Select(t => new
            {
                t.FullName,
                Parameters = t.Constructors.Cast<MethodDefinition>()
                    .Select(m => m.Parameters)
                    .MaxBy(p => p.Count)
                    .Select(p => p.Name)
                    .ToJoinedString(", "),
                Summary = summaries[t.FullName] + " " + t.Constructors.Cast<MethodDefinition>()
                    .OrderBy(m => m.Parameters.Count)
                    .Select(m => m.Parameters.Select(p => p.Name).ToJoinedString(", "))
                    .Select((s, i) => string.Format("{0}:({1})", i + 1, s))
                    .ToJoinedString(", "),
                Param = t.Constructors.Cast<MethodDefinition>()
                    .MaxBy(m => m.Parameters.Count)
                    .Parameters
                    .Select(p => string.Format(Template.Param, p.ParameterType.ToJSName(), p.Name))
                    .ToJoinedString(Environment.NewLine),
            })
            .Select(a => Template.Class.TemplateReplace(a));

        var inheritance = rxjsTypes
            .Where(t => t.BaseType.Namespace == RootNamespace)
            .Select(t => string.Format(Template.Inheritance, t.FullName, t.BaseType.FullName));

        var objects = rxjsTypes
            .Where(t => t.Constructors.Count == 0)
            .Select(t => string.Format(Template.Object, t.FullName));

        var methods = rxjsTypes
            .Select(t => t.Methods.Cast<MethodDefinition>())
            .Select(md => md
                .Where(m => !m.IsGetter && !m.IsSetter)
                .GroupBy(m => m.Name)
                .OrderBy(g => g.Key)
                .Select(g => new
                {
                    Method = g.MaxBy(m => m.Parameters.Count),
                    Overload = g.Select(m =>
                            m.Parameters.Select(p => p.Name).ToJoinedString(", "))
                        .Select((s, i) => string.Format("{0}:({1})", i + 1, s))
                        .ToJoinedString(", ")
                })
                .Select(a => 
                {
                    string summary;
                    summaries.TryGetValue(a.Method.ToString().Split(' ').Last().Replace("::", ".").Replace("()", ""), out summary);
                    return new
                    {
                        a.Method.IsStatic,
                        ClassName = a.Method.DeclaringType.ToString(),
                        MethodName = a.Method.Name,
                        Parameters = a.Method.Parameters.Select(p => p.Name).ToJoinedString(", "),
                        Param = a.Method.Parameters
                            .Select(p => string.Format(Template.Param, p.ParameterType.ToJSName(), p.Name))
                            .ToJoinedString(Environment.NewLine),
                        Summary = summary + " " + a.Overload,
                        ReturnsType = a.Method.ReturnType.ReturnType.ToJSName()
                    };
                })
                .Select(a => (a.IsStatic) ? Template.StaticFunction.TemplateReplace(a) : Template.InstanceFunction.TemplateReplace(a))
                .ToJoinedString(Environment.NewLine)
            );

        var properties = rxjsTypes
            .Select(t => t.Methods.Cast<MethodDefinition>())
            .SelectMany(md => md.Where(m => m.IsGetter || m.IsSetter))
            .Select(m => string.Format(((m.DeclaringType as TypeDefinition).Constructors.Count > 0 && !m.IsStatic) ? Template.InstanceField : Template.ObjectField,
                    m.DeclaringType.ToString(), m.Name.RegexReplace("^.+_", "")));

        var vsdoc = Enumerable.Repeat(string.Format(Template.Object, RootNamespace), 1)
            .Concat(classes)
            .Concat(inheritance)
            .Concat(objects)
            .Concat(methods)
            .Concat(properties)
            .ToJoinedString(Environment.NewLine);

        File.WriteAllText("rx-vsdoc.js", vsdoc, Encoding.UTF8);
    }


    // Utility Extensions

    static string ToJoinedString<T>(this IEnumerable<T> source, string separator)
    {
        var index = -1;
        return source.Aggregate(new StringBuilder(), (sb, s) =>
                (++index == 0) ? sb.Append(s) : sb.Append(separator).Append(s))
            .ToString();
    }

    static T MaxBy<T, TKey>(this IEnumerable<T> source, Func<T, TKey> selector) where TKey : IComparable
    {
        return source.Aggregate((x, y) => selector(x).CompareTo(selector(y)) > 0 ? x : y);
    }

    static string RegexReplace(this string input, string pattern, string replacement)
    {
        return Regex.Replace(input, pattern, replacement);
    }

    static string TemplateReplace(this string template, object replacement)
    {
        var dict = replacement.GetType().GetProperties()
            .ToDictionary(pi => pi.Name, pi => pi.GetValue(replacement, null).ToString());

        return Regex.Replace(template,
            "{(" + string.Join("|", dict.Select(kvp => Regex.Escape(kvp.Key)).ToArray()) + ")}",
            m => dict[m.Groups[1].Value]);
    }

    static string ToJSName(this TypeReference type)
    {
        switch (type.Name)
        {
            case "Int16":
            case "Int32":
            case "Int64":
            case "Single":
            case "Double":
                return "Number";
            case "DateTime":
                return "Date";
            default:
                return type.FullName.StartsWith(RootNamespace + ".") ? type.FullName : type.Name;
        }
    }

    static IEnumerable<T> Select<T>(this ParameterDefinitionCollection source, Func<ParameterDefinition, T> selector)
    {
        return source.Cast<ParameterDefinition>().Select(selector);
    }
}