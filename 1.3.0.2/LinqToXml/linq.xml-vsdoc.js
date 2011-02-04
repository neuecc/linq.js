if (typeof Linq == "undefined") Linq = {};

Linq.Xml = X =
{
    Anchors: function()
    {
        /// <returns type="Linq.Object"></returns>
    },

    Body: function()
    {
        /// <returns type="Linq.Xml.XElement"></returns>
    },

    ID: function(id)
    {
        /// <returns type="Linq.Xml.XElement"></returns>
    },

    Initialize: function(func)
    {
        /// <returns type="void"></returns>
    },

    Load: function(url, func)
    {
        /// <summary>
        /// 1.function(url) - Sync.
        /// 2.function(url, func) - Async.
        /// </summary>
        /// <param name="url" type="String"></param>
        /// <param name="func" type="Optional:Function">If use this - returns type is void</param>
        /// <returns type="Linq.Xml.XElement"></returns>
    },

    // DOM Builder

    Attr: function(name, value)
    {
        /// <returns type="Linq.Xml.XAttribute"></returns>
    },

    Elem: function(name, Params_Contents)
    {
        /// <param name="Params_Contents" type="Object"></param>
        /// <returns type="Linq.Xml.XElement"></returns>
    },

    Text: function(value)
    {
        /// <returns type="Linq.Xml.XText"></returns>
    }
}

/* Abstract Class */

Linq.Xml.XObject = function(element) { }

Linq.Xml.XObject.prototype.NodeType = function()
{
    /// <returns type="Number" integer="true"></returns>
}

Linq.Xml.XObject.prototype.Parent = function()
{
    /// <returns type="Linq.Xml.XElement"></returns>
}

Linq.Xml.XNode = function(element) { };
Linq.Xml.XNode.prototype = new Linq.Xml.XObject();

Linq.Xml.XNode.prototype.NextNode = function()
{
    /// <returns type="Linq.Xml.XNode"></returns>
}

Linq.Xml.XNode.prototype.PreviousNode = function()
{
    /// <returns type="Linq.Xml.XNode"></returns>
}

// Overload:function()
// Overload:function(name)
Linq.Xml.XNode.prototype.Ancestors = function(name)
{
    /// <summary>
    /// 1.function() - All.
    /// 2.function(name) - Match only.
    /// </summary>
    /// <param name="name" type="Optional:String"></param>
    /// <returns type="Linq.Object"></returns>
}

Linq.Xml.XNode.prototype.ToString = function()
{
    /// <returns type="String"></returns>
}

// XDocument|XElement Base
Linq.Xml.XContainer = function(element) { };
Linq.Xml.XContainer.prototype = new Linq.Xml.XNode();

Linq.Xml.XContainer.prototype.Add = function(Params_Contents)
{
    /// <param name="Params_Contents" type="Object"></param>
    /// <returns type="void"></returns>
}

Linq.Xml.XContainer.prototype.DescendantNodes = function()
{
    /// <returns type="Linq.Object"></returns>
}

// Overload:function()
// Overload:function(name)
Linq.Xml.XContainer.prototype.Descendants = function(name)
{
    /// <summary>
    /// 1.function() - All.
    /// 2.function(name) - Match only.
    /// </summary>
    /// <param name="name" type="Optional:String"></param>
    /// <returns type="Linq.Object"></returns>
}

Linq.Xml.XContainer.prototype.Element = function(name)
{
    /// <returns type="Linq.Xml.XElement"></returns>
}

// Overload:function()
// Overload:function(name)
Linq.Xml.XContainer.prototype.Elements = function(name)
{
    /// <summary>
    /// 1.function() - All.
    /// 2.function(name) - Match only.
    /// </summary>
    /// <param name="name" type="Optional:String"></param>
    /// <returns type="Linq.Object"></returns>
}

Linq.Xml.XContainer.prototype.Nodes = function()
{
    /// <returns type="Linq.Object"></returns>
}

Linq.Xml.XContainer.prototype.Remove = function()
{
    /// <returns type="void"></returns>
}

Linq.Xml.XContainer.prototype.RemoveNodes = function()
{
    /// <returns type="void"></returns>
}


/* Concrete Class */

// Text Object
Linq.Xml.XText = function(element) { }
Linq.Xml.XText.prototype = new Linq.Xml.XNode();

Linq.Xml.XText.prototype.Value = function()
{
    /// <returns type="String"></returns>
}

Linq.Xml.XText.prototype.SetValue = function(value)
{
    /// <returns type="void"></returns>
}


// Attribute Object
Linq.Xml.XAttribute = function(attributeNode, parent) { }
Linq.Xml.XAttribute.prototype = new Linq.Xml.XObject();

Linq.Xml.XAttribute.prototype.Parent = function()
{
    /// <returns type="Linq.Xml.XElement"></returns>
}

Linq.Xml.XAttribute.prototype.Remove = function()
{
    /// <returns type="void"></returns>
}

Linq.Xml.XAttribute.prototype.SetValue = function(value)
{
    /// <returns type="void"></returns>
}

Linq.Xml.XAttribute.prototype.Value = function()
{
    /// <returns type="String"></returns>
}


// Element Object

Linq.Xml.XElement = function(element) { }
Linq.Xml.XElement.prototype = new Linq.Xml.XContainer();

Linq.Xml.XElement.prototype.AttachEvent = function(eventName, eventHandler)
{
    /// <param name="eventName" type="String"></param>
    /// <param name="eventHandler" type="Action&lt;DOM,Event>">funtion(sender, event)</param>
    /// <returns type="void"></returns>
}

Linq.Xml.XElement.prototype.DetachEvent = function(eventName, func)
{
    /// <returns type="void"></returns>
}

Linq.Xml.XElement.prototype.Attribute = function(name)
{
    /// <returns type="Linq.Xml.XAttribute"></returns>
}

// Overload:function()
// Overload:function(name)
Linq.Xml.XElement.prototype.Attributes = function(name)
{
    /// <summary>
    /// 1.function() - All.
    /// 2.function(name) - Match only.
    /// </summary>
    /// <param name="name" type="Optional:String"></param>
    /// <returns type="Linq.Object"></returns>
}

Linq.Xml.XElement.prototype.SetValue = function(value)
{
    /// <returns type="void"></returns>
}

// Overload:function()
// Overload:function(parser)
Linq.Xml.XElement.prototype.Value = function(parser)
{
    /// <summary>
    /// 1.function() - return string.
    /// 2.function(parser) - return parse type.
    /// </summary>
    /// <param name="parser" type="Optional:Func<string,T>"></param>
    /// <returns type="string"></returns>
}