/*--------------------------------------------------------------------------
* linq.xml.js - Linq to Xml for JavaScript (linq.js Extension)
* ver 0.0.0.3 (Jun. 5th, 2009)
*
* created and maintained by neuecc <ils@neue.cc>
* licensed under Microsoft Public License(Ms-PL)
* http://neue.cc/
* http://linqjs.codeplex.com/
*--------------------------------------------------------------------------*/

// Namespace
if (typeof Linq == "undefined") Linq = {};

// Generator : X is Shortcut Symbol of Linq.Xml
Linq.Xml = X =
{
    Anchors: function()
    {
        return Linq.Xml.Body().Descendants("a");
    },

    Body: function()
    {
        return Linq.Xml.Utils.CreateXWrapper(document.body);
    },

    ID: function(id)
    {
        return Linq.Xml.Utils.CreateXWrapper(document.getElementById(id));
    },

    Initialize: function(func)
    {
        if (document.addEventListener) document.addEventListener("DOMContentLoaded", func, false);
        else window.attachEvent("onload", func);
    },

    // Overload:function(url)
    // Overload:function(url, func)
    Load: function(url, func)
    {
        var isAsync = (func != null);
        var xhr = (window.ActiveXObject) ? new ActiveXObject("MSXML2.XMLHTTP") : new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (isAsync && xhr.readyState === 4 && (location.protocol === "file:" || xhr.status === 200))
            {
                func(Linq.Xml.Utils.CreateXWrapper(xhr.responseXML.documentElement));
            }
        }
        xhr.open("GET", url, isAsync);
        xhr.send(null);
        // for IE.read local xml
        if (!isAsync && xhr.responseXML.documentElement == null)
        {
            var doc = new ActiveXObject("MSXML2.DOMDocument");
            doc.async = false;
            doc.load(url);
            return Linq.Xml.Utils.CreateXWrapper(doc.documentElement);
        }
        else
        {
            return Linq.Xml.Utils.CreateXWrapper(xhr.responseXML.documentElement);
        }
    },

    // DOM Builder

    Attr: function(name, value)
    {
        var attr = document.createAttribute(name);
        attr.value = value;
        return Linq.Xml.Utils.CreateXWrapper(attr);
    },

    Elem: function(name, contents)
    {
        var elem = document.createElement(name);
        var xEle = Linq.Xml.Utils.CreateXWrapper(elem);
        E.From(arguments).Skip(1).ForEach(function(x) { xEle.Add(x); });
        return xEle;
    },

    Text: function(value)
    {
        var node = document.createTextNode(value);
        return Linq.Xml.Utils.CreateXWrapper(node);
    }
}

// Enum
Linq.Xml.NodeType =
{
    Element: 1,
    Attribute: 2,
    Text: 3,
    CDATA: 4,
    EntityReference: 5,
    Entity: 6,
    ProcessingInstruction: 7,
    Comment: 8,
    Document: 9,
    DocumentType: 10,
    DocumentFragment: 11,
    Notation: 12
}

// Utility Methods
Linq.Xml.Utils =
{
    CreateXWrapper: function(element, parent)
    {
        return (element == null) ? null :
               (element.nodeType === Linq.Xml.NodeType.Element) ? new Linq.Xml.XElement(element) :
               (element.nodeType === Linq.Xml.NodeType.Text) ? new Linq.Xml.XText(element) :
               (element.nodeType === Linq.Xml.NodeType.Attribute) ? new Linq.Xml.XAttribute(element, parent) :
               null;
    },

    StringCaseCompare: function(str1, str2)
    {
        return (str1.toUpperCase() === str2.toUpperCase())
    }
}

/* Abstract Class */

// All Base object
Linq.Xml.XObject = function(element)
{
    this.Source = element;
}

Linq.Xml.XObject.prototype.NodeType = function()
{
    return this.Source.nodeType;
}

Linq.Xml.XObject.prototype.Parent = function()
{
    return Linq.Xml.Utils.CreateXWrapper(this.Source.parentNode);
}


// XContainer|XText Base
Linq.Xml.XNode = function(element)
{
    Linq.Xml.XObject.call(this, element);
}
Linq.Xml.XNode.prototype = new Linq.Xml.XObject();

Linq.Xml.XNode.prototype.NextNode = function()
{
    return Linq.Xml.Utils.CreateXWrapper(this.Source.nextSibling);
}

Linq.Xml.XNode.prototype.PreviousNode = function()
{
    return Linq.Xml.Utils.CreateXWrapper(this.Source.previousSibling);
}

// Overload:function()
// Overload:function(name)
Linq.Xml.XNode.prototype.Ancestors = function(name)
{
    var source = this.Source;

    return new Linq.Object(function()
    {
        var array = [];
        var node = this.Source.parentNode;
        while (node.parentNode)
        {
            if (node.nodeType === Linq.Xml.NodeType.Element) array.push(node);
            node = node.parentNode;
        }
        var nodes = Linq.Enumerable.From(array);
        if (name != null)
        {
            nodes = nodes.Where(function(e) { return Linq.Xml.Utils.StringCaseCompare(e.nodeName, name); });
        }
        return nodes.Select(function(e) { return Linq.Xml.Utils.CreateXWrapper(e); }).GetEnumerator();
    });
}

Linq.Xml.XNode.prototype.ToString = function()
{
    var result = this.Source.outerHTML;
    if (result == null)
    {
        var dummy = document.createElement("div");
        dummy.appendChild(this.Source.cloneNode(true));
        result = dummy.innerHTML;
    }
    return result;
}


// XDocument|XElement Base
Linq.Xml.XContainer = function(element)
{
    Linq.Xml.XNode.call(this, element);
}
Linq.Xml.XContainer.prototype = new Linq.Xml.XNode();

Linq.Xml.XContainer.prototype.Add = function(contents)
{
    var self = this;
    var elem = this.Source;
    
    E.From(arguments).ForEach(function(item)
    {
        if (item instanceof Linq.Xml.XElement || item instanceof Linq.Xml.XText)
        {
            elem.appendChild(item.Source);
        }
        else if (item instanceof Linq.Xml.XAttribute)
        {
            // special case for IE.
            if (item.Source.name == "style") elem.style.cssText = item.Source.value;
            else elem.setAttributeNode(item.Source);
        }
        else if (item instanceof Linq.Object)
        {
            item.ForEach(function(x) { self.Add(x); });
        }
        else // Value
        {
            var node = document.createTextNode(item);
            elem.appendChild(node);
        }
    });
}

Linq.Xml.XContainer.prototype.DescendantNodes = function()
{
    var source = this.Source;

    return new Linq.Object(function()
    {
        var array = [];
        (function(nodes)
        {
            for (var i = 0; i < nodes.length; i++)
            {
                array.push(nodes[i]);
                if (nodes[i].hasChildNodes()) arguments.callee(nodes[i].childNodes);
            }
        })(source.childNodes);
        return Linq.Enumerable.From(array)
            .Select(function(elem) { return Linq.Xml.Utils.CreateXWrapper(elem); })
            .GetEnumerator();
    });
}

// Overload:function()
// Overload:function(name)
Linq.Xml.XContainer.prototype.Descendants = function(name)
{
    var source = this.Source;

    return new Linq.Object(function()
    {
        var elems;
        if (name != null)
        {
            elems = Linq.Enumerable.From(source.getElementsByTagName(name))
                .Where(function(e) { return e.nodeType === Linq.Xml.NodeType.Element; });
        }
        else
        {
            var array = [];
            (function(nodes)
            {
                for (var i = 0; i < nodes.length; i++)
                {
                    if (nodes[i].nodeType === Linq.Xml.NodeType.Element)
                    {
                        array.push(nodes[i]);
                        if (nodes[i].hasChildNodes()) arguments.callee(nodes[i].childNodes);
                    }
                }
            })(source.childNodes);
            elems = Linq.Enumerable.From(array);
        }
        return elems
            .Select(function(elem) { return Linq.Xml.Utils.CreateXWrapper(elem); })
            .GetEnumerator();
    });
}

Linq.Xml.XContainer.prototype.Element = function(name)
{
    return this.Elements(name).First();
}

// Overload:function()
// Overload:function(name)
Linq.Xml.XContainer.prototype.Elements = function(name)
{
    var source = this.Source;

    return new Linq.Object(function()
    {
        var elems = Linq.Enumerable.From(source.childNodes)
            .Where(function(elem) { return elem.nodeType === Linq.Xml.NodeType.Element });
        if (name != null)
        {
            elems = elems.Where(function(elem) { return Linq.Xml.Utils.StringCaseCompare(elem.nodeName, name); });
        }
        return elems.Select(function(elem) { return Linq.Xml.Utils.CreateXWrapper(elem); }).GetEnumerator();
    });
}

Linq.Xml.XContainer.prototype.Nodes = function()
{
    var source = this.Source;

    return new Linq.Object(function()
    {
        return Linq.Enumerable.From(source.childNodes)
            .Select(function(elem) { return Linq.Xml.Utils.CreateXWrapper(elem); }).GetEnumerator();
    });

}

Linq.Xml.XContainer.prototype.Remove = function()
{
    this.Source.parentNode.removeChild(this.Source);
}

Linq.Xml.XContainer.prototype.RemoveNodes = function()
{
    while (this.Source.hasChildNodes())
    {
        this.Source.removeChild(this.Source.firstChild);
    }
}


/* Concrete Class */

// Text Object
Linq.Xml.XText = function(element)
{
    Linq.Xml.XNode.call(this, element);
}
Linq.Xml.XText.prototype = new Linq.Xml.XNode();

Linq.Xml.XText.prototype.Value = function()
{
    return this.Source.nodeValue;
}

Linq.Xml.XText.prototype.SetValue = function(value)
{
    this.Source.nodeValue = value;
}


// Attribute Object
Linq.Xml.XAttribute = function(attributeNode, parent)
{
    Linq.Xml.XObject.call(this, attributeNode);
    this.SourceParent = parent;
}
Linq.Xml.XAttribute.prototype = new Linq.Xml.XObject();

Linq.Xml.XAttribute.prototype.Parent = function()
{
    return Linq.Xml.Utils.CreateXWrapper(this.SourceParent);
}

Linq.Xml.XAttribute.prototype.Remove = function()
{
    this.SourceParent.removeAttributeNode(this.Source);
}

Linq.Xml.XAttribute.prototype.SetValue = function(value)
{
    this.Source.nodeValue = value;
}

Linq.Xml.XAttribute.prototype.Value = function()
{
    return this.Source.nodeValue;
}


// Element Object

Linq.Xml.XElement = function(element)
{
    Linq.Xml.XContainer.call(this, element);
}
Linq.Xml.XElement.prototype = new Linq.Xml.XContainer();

Linq.Xml.XElement.prototype.AttachEvent = function(eventName, eventHandler)
{
    if (this.Source.addEventListener) // Firefox, Chrome
    {
        this.Source.addEventListener(eventName, function(event) { eventHandler(this, event) }, false);
    }
    else // IE
    {
        this.Source.attachEvent("on" + eventName, function() { eventHandler(event.srcElement, window.event) });
    }
}

Linq.Xml.XElement.prototype.DetachEvent = function(eventName, func)
{
    if (this.Source.removeEventListener) this.Source.removeEventListener(eventName, func, false);
    else this.Source.detachEvent("on" + eventName, func);
}

Linq.Xml.XElement.prototype.Attribute = function(name)
{
    return Linq.Xml.Utils.CreateXWrapper(this.Source.getAttributeNode(name), this.Source);
}

// Overload:function()
// Overload:function(name)
Linq.Xml.XElement.prototype.Attributes = function(name)
{
    var source = this.Source;

    return new Linq.Object(function()
    {
        var attrs = Linq.Enumerable.From(source.attributes);
        attrs = (name != null)
            ? attrs.Where(function(a) { return Linq.Xml.Utils.StringCaseCompare(a.nodeName, name); })
            : attrs.Where(function(a) { return a.nodeValue != null; });
        return attrs.Select(function(a) { return Linq.Xml.Utils.CreateXWrapper(a, source); }).GetEnumerator();
    });
}

Linq.Xml.XElement.prototype.SetValue = function(value)
{
    this.RemoveNodes();
    var node = document.createTextNode(value);
    this.Source.appendChild(node);
}

// Overload:function()
// Overload:function(parser)
Linq.Xml.XElement.prototype.Value = function(parser)
{
    if (parser == null) parser = function(x) { return x; };

    var stringBuilder = [];
    (function(nodes)
    {
        for (var i = 0; i < nodes.length; i++)
        {
            if (nodes[i].hasChildNodes()) arguments.callee(nodes[i].childNodes);
            else if (nodes[i].nodeType === Linq.Xml.NodeType.Text) stringBuilder.push(nodes[i].nodeValue);
        }
    })(this.Source.childNodes)

    return parser(stringBuilder.join(""));
}