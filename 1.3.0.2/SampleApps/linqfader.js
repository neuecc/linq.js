/*--------------------------------------------------------------------------
* linqfader - linq.js Sample
* ver 1.0.0.0 (Apr. 12th, 2009)
*
* created and maintained by neuecc <ils@neue.cc>
* licensed under Microsoft Public License(Ms-PL)
* http://neue.cc/
* http://linqjs.codeplex.com/
*--------------------------------------------------------------------------*/

(function()
{
    // customize : here

    var _targetColor = "#e10000"; // #RRGGBB
    var fadeSpeed = 400; // millisecond

    // customize : end.

    // Global Variable

    var ColorTable = { aliceblue: 'f0f8ff', antiquewhite: 'faebd7', aqua: '00ffff', aquamarine: '7fffd4', azure: 'f0ffff', beige: 'f5f5dc', bisque: 'ffe4c4', black: '000000', blanchedalmond: 'ffebcd', blue: '0000ff', blueviolet: '8a2be2', brown: 'a52a2a', burlywood: 'deb887', cadetblue: '5f9ea0', chartreuse: '7fff00', chocolate: 'd2691e', coral: 'ff7f50', cornflowerblue: '6495ed', cornsilk: 'fff8dc', crimson: 'dc143c', cyan: '00ffff', darkblue: '00008b', darkcyan: '008b8b', darkgoldenrod: 'b8860b', darkgray: 'a9a9a9', darkgreen: '006400', darkkhaki: 'bdb76b', darkmagenta: '8b008b', darkolivegreen: '556b2f', darkorange: 'ff8c00', darkorchid: '9932cc', darkred: '8b0000', darksalmon: 'e9967a', darkseagreen: '8fbc8f', darkslateblue: '483d8b', darkslategray: '2f4f4f', darkturquoise: '00ced1', darkviolet: '9400d3', deeppink: 'ff1493', deepskyblue: '00bfff', dimgray: '696969', dodgerblue: '1e90ff', feldspar: 'd19275', firebrick: 'b22222', floralwhite: 'fffaf0', forestgreen: '228b22', fuchsia: 'ff00ff', gainsboro: 'dcdcdc', ghostwhite: 'f8f8ff', gold: 'ffd700', goldenrod: 'daa520', gray: '808080', green: '008000', greenyellow: 'adff2f', honeydew: 'f0fff0', hotpink: 'ff69b4', indianred: 'cd5c5c', indigo: '4b0082', ivory: 'fffff0', khaki: 'f0e68c', lavender: 'e6e6fa', lavenderblush: 'fff0f5', lawngreen: '7cfc00', lemonchiffon: 'fffacd', lightblue: 'add8e6', lightcoral: 'f08080', lightcyan: 'e0ffff', lightgoldenrodyellow: 'fafad2', lightgrey: 'd3d3d3', lightgreen: '90ee90', lightpink: 'ffb6c1', lightsalmon: 'ffa07a', lightseagreen: '20b2aa', lightskyblue: '87cefa', lightslateblue: '8470ff', lightslategray: '778899', lightsteelblue: 'b0c4de', lightyellow: 'ffffe0', lime: '00ff00', limegreen: '32cd32', linen: 'faf0e6', magenta: 'ff00ff', maroon: '800000', mediumaquamarine: '66cdaa', mediumblue: '0000cd', mediumorchid: 'ba55d3', mediumpurple: '9370d8', mediumseagreen: '3cb371', mediumslateblue: '7b68ee', mediumspringgreen: '00fa9a', mediumturquoise: '48d1cc', mediumvioletred: 'c71585', midnightblue: '191970', mintcream: 'f5fffa', mistyrose: 'ffe4e1', moccasin: 'ffe4b5', navajowhite: 'ffdead', navy: '000080', oldlace: 'fdf5e6', olive: '808000', olivedrab: '6b8e23', orange: 'ffa500', orangered: 'ff4500', orchid: 'da70d6', palegoldenrod: 'eee8aa', palegreen: '98fb98', paleturquoise: 'afeeee', palevioletred: 'd87093', papayawhip: 'ffefd5', peachpuff: 'ffdab9', peru: 'cd853f', pink: 'ffc0cb', plum: 'dda0dd', powderblue: 'b0e0e6', purple: '800080', red: 'ff0000', rosybrown: 'bc8f8f', royalblue: '4169e1', saddlebrown: '8b4513', salmon: 'fa8072', sandybrown: 'f4a460', seagreen: '2e8b57', seashell: 'fff5ee', sienna: 'a0522d', silver: 'c0c0c0', skyblue: '87ceeb', slateblue: '6a5acd', slategray: '708090', snow: 'fffafa', springgreen: '00ff7f', steelblue: '4682b4', tan: 'd2b48c', teal: '008080', thistle: 'd8bfd8', tomato: 'ff6347', turquoise: '40e0d0', violet: 'ee82ee', violetred: 'd02090', wheat: 'f5deb3', white: 'ffffff', whitesmoke: 'f5f5f5', yellow: 'ffff00', yellowgreen: '9acd32' };

    var HexToDecTable = (function()
    {
        var numbers = E.RangeTo(0, 9);
        var alphabet = E.RangeTo('a'.charCodeAt(0), 'f'.charCodeAt(0)).Select("String.fromCharCode($)");
        var digits = numbers.Concat(alphabet);
        var colors = E.From(digits).SelectMany(function(i)
        {
            return E.From(digits).Select(function(j)
            {
                return i.toString() + j.toString();
            })
        });
        return colors.Select("v,i=>{v:v,i:i}").ToObject("$.v", "$.i");
    })();

    var DecToHexTable = E.From(HexToDecTable).ToObject("$.Value", "$.Key");

    var targetColor = new Color(_targetColor);
    var resolution = 10;

    // Class

    function Palette(dec, hex)
    {
        this.Dec = dec;
        this.Hex = hex;
    }

    function Color(strColor)
    {
        strColor = strColor.toLowerCase();
        if (ColorTable.hasOwnProperty(strColor)) strColor = '#' + ColorTable[strColor];

        if (strColor.indexOf("rgb") != -1)
        {
            var array = strColor.split(",");
            var decR = parseInt(array[0].substring(4, array[0].length));
            var decG = parseInt(array[1]);
            var decB = parseInt(array[2].substring(0, array[2].length - 1));
            this.R = new Palette(decR, DecToHexTable[decR]);
            this.G = new Palette(decG, DecToHexTable[decG]);
            this.B = new Palette(decB, DecToHexTable[decB]);
        }
        else
        {
            var hexR = strColor.substr(1, 2);
            var hexG = strColor.substr(3, 2);
            var hexB = strColor.substr(5, 2);
            this.R = new Palette(HexToDecTable[hexR], hexR);
            this.G = new Palette(HexToDecTable[hexG], hexG);
            this.B = new Palette(HexToDecTable[hexB], hexB);
        }
    }

    Color.prototype.SetFromDec = function(decR, decG, decB)
    {
        this.R.Dec = decR;
        this.R.Hex = DecToHexTable[decR];
        this.G.Dec = decG;
        this.G.Hex = DecToHexTable[decG];
        this.B.Dec = decB;
        this.B.Hex = DecToHexTable[decB];
    }

    Color.prototype.ToHex = function()
    {
        return "#" + this.R.Hex + this.G.Hex + this.B.Hex;
    }


    // Method

    function FadeText(elem, color, targetColor, intervalID)
    {
        clearInterval(intervalID[0]);
        var fadeR = (targetColor.R.Dec - color.R.Dec) / (fadeSpeed / resolution);
        var fadeG = (targetColor.G.Dec - color.G.Dec) / (fadeSpeed / resolution);
        var fadeB = (targetColor.B.Dec - color.B.Dec) / (fadeSpeed / resolution);
        var r = color.R.Dec;
        var g = color.G.Dec;
        var b = color.B.Dec;

        intervalID[0] = setInterval(function()
        {
            r += fadeR;
            g += fadeG;
            b += fadeB;
            if ((fadeR > 0) ? r >= targetColor.R.Dec : r <= targetColor.R.Dec) r = targetColor.R.Dec;
            if ((fadeG > 0) ? g >= targetColor.G.Dec : g <= targetColor.G.Dec) g = targetColor.G.Dec;
            if ((fadeB > 0) ? b >= targetColor.B.Dec : b <= targetColor.B.Dec) b = targetColor.B.Dec;
            color.SetFromDec(Math.floor(r), Math.floor(g), Math.floor(b));
            elem.style.color = color.ToHex();
            if (r === targetColor.R.Dec && g === targetColor.G.Dec && b === targetColor.B.Dec)
            {
                clearInterval(intervalID[0]);
            }
        }, resolution);
    }

    function AttachEvent(elem, event, func)
    {
        if (elem.addEventListener) elem.addEventListener(event, func, false);
        else if (elem.attachEvent) elem.attachEvent("on" + event, func);
    }

    function Initialize()
    {
        var nodeList = document.getElementsByTagName("a");

        E.From(nodeList).ForEach(function(elem)
        {
            var strColor = (elem.currentStyle)
                ? elem.currentStyle.color
                : document.defaultView.getComputedStyle(elem, null).getPropertyValue("color");
            var color = new Color(strColor);
            var intervalID = []; // call by reference
            AttachEvent(elem, "mouseover", function() { FadeText(elem, color, targetColor, intervalID) });
            AttachEvent(elem, "mouseout", function() { FadeText(elem, color, new Color(strColor), intervalID) });
        });
    }

    // Main

    AttachEvent(window, "load", Initialize);
})();