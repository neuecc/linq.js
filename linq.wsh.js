/*--------------------------------------------------------------------------
* linq.wsh.js - WSH Support Library
* ver 1.0.0.0 (xxx. th, 2009)
*
* created and maintained by neuecc <ils@neue.cc>
* licensed under Microsoft Public License(Ms-PL)
* http://neue.cc/
* http://linqjs.codeplex.com/
*--------------------------------------------------------------------------*/

// Namespace
if (typeof Linq == "undefined") Linq = {};

Linq.Wsh = W =
{
    // Original Methods

    ConnectObject: function(object, prefix)
    {
        WScript.ConnectObject(object, prefix);
    },
    CreateObject: function(progID, prefix)
    {
        return WScript.CreateObject(progID, prefix);
    },
    DisconnectObject: function(object)
    {
        WScript.DisconnectObject(object);
    },
    Echo: function(pArgs)
    {
        WScript.Echo(pArgs);
    },
    GetObject: function(pathname, progID, prefix)
    {
        return WScript.GetObject(pathname, progID, prefix)
    },
    Quit: function(exitCode)
    {
        WScript.Quit(exitCode);
    },
    Sleep: function(time)
    {
        WScript.Sleep(time);
    },

    // Original Property

    Application: function()
    {
        return WScript.Application;
    },
    Arguments: function()
    {
        return WScript.Arguments;
    },
    BuildVersion: function()
    {
        return WScript.BuildVersion;
    },
    FullName: function()
    {
        return WScript.FullName;
    },
    Interactive: function()
    {
        return WScript.Interactive;
    },
    Name: function()
    {
        return WScript.Name;
    },
    Path: function()
    {
        return WScript.Path;
    },
    ScriptName: function()
    {
        return WScript.ScriptName;
    },
    ScriptFullName: function()
    {
        return WScript.ScriptFullName;
    },
    StdErr: function()
    {
        return WScript.StdErr;
    },
    StdIn: function()
    {
        return WScript.StdIn;
    },
    StdOut: function()
    {
        return WScript.StdOut;
    },
    Timeout: function()
    {
        return WScript.Timeout;
    },
    Version: function()
    {
        return WScript.Version;
    },

    // Additional Methods

    CreateShell: function()
    {
        return W.CreateObject("WScript.Shell");
    },
    CreateNetwork: function()
    {
        return W.CreateObject("WScript.Network");
    },
    CreateFileSystem: function()
    {
        return W.CreateObject("Scripting.FileSystemObject");
    },
    InputBox: function(title, description, defaultText)
    {
        return W._Control.Run("vbInputBox", title, description, defaultText);
    },
    MsgBox: function(prompt, buttons, title)
    {
        return W._Control.Run("vbMsgBox", prompt, buttons, title);
    },
    ScriptDirectory: function()
    {
        var exePath = W.ScriptFullName();
        return exePath.substring(0, exePath.length - W.ScriptName().length);
    },
    Using: function(stream, action)
    {
        try
        {
            action(stream);
        }
        finally
        {
            stream.Close();
        }
    },

    // Bytes

    Bytes:
    {
        At: function(bytes, index)
        {
            return W._Control.Run("vbAt", bytes, index);
        },

        Count: function(bytes)
        {
            return W._Control.Run("vbCount", bytes);
        },

        FromBase64String: function(base64str)
        {
            var xml = W.CreateObject("Microsoft.XMLDOM");
            var elem = xml.createElement("data");
            elem.dataType = "bin.base64";
            elem.text = base64str;
            return elem.nodeTypedValue;
        },

        ToBase64String: function(bytes)
        {
            var xml = W.CreateObject("Microsoft.XMLDOM");
            var elem = xml.createElement("data");
            elem.dataType = "bin.base64";
            elem.nodeTypedValue = bytes;
            return elem.text;
        },

        ToBytesFromArray: function(intArray)
        {
            return E.From(intArray)
                .Aggregate(W.CreateObject("System.IO.MemoryStream"), function(ms, i)
                {
                    ms.WriteByte(i);
                    return ms;
                })
                .ToArray();
        },

        ToBytesFromString: function(input)
        {
            var encoding = W.CreateObject("System.Text.UTF8Encoding");
            return encoding.GetBytes_4(input);
        },

        ToLinq: function(bytes)
        {
            return new Linq.Object(function()
            {
                var length = W.Bytes.Count(bytes);
                var index = 0;
                return new Linq.Enumerator(function()
                {
                    if (index < length)
                    {
                        this.Current = W.Bytes.At(bytes, index++);
                        return true;
                    }
                    return false;
                });
            });
        },

        ToMD5String: function(bytes)
        {
            var encoding = W.CreateObject("System.Text.UTF8Encoding");
            var md5 = W.CreateObject("System.Security.Cryptography.MD5CryptoServiceProvider");
            var hash = md5.ComputeHash_2(bytes);

            return W.Bytes.ToLinq(hash)
                .Aggregate(W.CreateObject("System.Text.StringBuilder"),
                    "sb,b=>sb.AppendFormat('{0:x2}',b)")
                .ToString();
        },

        ToSHA1String: function(bytes)
        {
            var encoding = W.CreateObject("System.Text.UTF8Encoding");
            var sha1 = W.CreateObject("System.Security.Cryptography.SHA1Managed");
            var hash = sha1.ComputeHash_2(bytes);

            return W.Bytes.ToLinq(hash)
                .Aggregate(W.CreateObject("System.Text.StringBuilder"),
                    "sb,b=>sb.AppendFormat('{0:x2}',b)")
                .ToString();
        }
    }
};

// VB Controls(private)
Linq.Wsh._Control = (function()
{
    var control = W.CreateObject("MSScriptControl.ScriptControl");
    control.language = "VBScript";
    control.addcode("Function vbInputBox(title,description,defaultText) vbInputBox = InputBox(description,title,defaultText) End Function");
    control.addcode("Function vbMsgBox(prompt,buttons,title) vbMsgBox = MsgBox(prompt,buttons,title) End Function");
    control.addcode("Function vbCount(obj) vbCount = LenB(obj) End Function");
    control.addcode("Function vbAt(obj,index) vbAt = AscB(MidB(obj,index+1,1)) End Function");
    return control;
})();

Linq.Wsh.Enum =
{
    Environment: { System: "System", User: "User", Volatile: "Volatile", Process: "Process" },
    EnvironmentSrc:
    {
        LogonServer: "%LogonServer%",
        UserDomain: "%UserDomain%",
        UserName: "%UserName%",
        UserProfile: "%UserProfile%",
        HomePath: "%HomePath%",
        HomeDrive: "%HomeDrive%",
        AppData: "%AppData%",
        LocalAppData: "%LocalAppData%"
    },
    SpecialFolder:
    {
        AllUsersDesktop: "AllUsersDesktop",
        AllUsersPrograms: "AllUsersPrograms",
        AllUsersStartMenu: "AllUsersStartMenu",
        AllUsersStartup: "AllUsersStartup",
        Desktop: "Desktop",
        Programs: "Programs",
        StartMenu: "StartMenu",
        Startup: "Startup",
        Favorites: "Favorites",
        Fonts: "Fonts",
        MyDocuments: "MyDocuments",
        NetHood: "NetHood",
        PrintHood: "PrintHood",
        Recent: "Recent",
        SendTo: "SendTo",
        Templates: "Templates"
    },
    MsgBox:
    {
        Button:
        {
            OKOnly: 0,
            OKCancel: 1,
            AbortRetryIgnore: 2,
            YesNoCancel: 3,
            YesNo: 4,
            RetryCancel: 5,
            Critical: 16,
            Question: 32,
            Exclamation: 48,
            Information: 64,
            DefaultButton1: 0,
            DefaultButton2: 256,
            DefaultButton3: 512,
            DefaultButton4: 768,
            ApplicationModal: 0,
            SystemModal: 4096
        },
        Result:
        {
            OK: 1,
            Cancel: 2,
            Abort: 3,
            Retry: 4,
            Ignore: 5,
            Yes: 6,
            No: 7
        }
    },
    Popup:
    {
        Button:
        {
            OKOnly: 0,
            OKCancel: 1,
            AbortRetryIgnore: 2,
            YesNoCancel: 3,
            YesNo: 4,
            RetryCancel: 5
        },
        Icon:
        {
            Critical: 16,
            Question: 32,
            Exclamation: 48,
            Information: 64
        },
        Result:
        {
            Timeout: -1,
            OK: 1,
            Cancel: 2,
            Abort: 3,
            Retry: 4,
            Ignore: 5,
            Yes: 6,
            No: 7
        }
    },
    LogEvent:
    {
        Success: 0,
        Error: 1,
        Warning: 2,
        Information: 4,
        AuditSuccess: 8,
        AuditFailure: 16
    },

    // IWshRuntimeLibrary

    CompareMethod:
	{
	    BinaryCompare: 0,
	    TextCompare: 1,
	    DatabaseCompare: 2
	},
    DriveTypeConst:
	{
	    UnknownType: 0,
	    Removable: 1,
	    Fixed: 2,
	    Remote: 3,
	    CDRom: 4,
	    RamDisk: 5
	},
    FileAttribute:
	{
	    Normal: 0,
	    ReadOnly: 1,
	    Hidden: 2,
	    System: 4,
	    Volume: 8,
	    Directory: 16,
	    Archive: 32,
	    Alias: 1024,
	    Compressed: 2048
	},
    IOMode:
	{
	    ForReading: 1,
	    ForWriting: 2,
	    ForAppending: 8
	},
    SpecialFolderConst:
	{
	    WindowsFolder: 0,
	    SystemFolder: 1,
	    TemporaryFolder: 2
	},
    StandardStreamTypes:
	{
	    StdIn: 0,
	    StdOut: 1,
	    StdErr: 2
	},
    Tristate:
	{
	    TristateFalse: 0,
	    TristateUseDefault: -2,
	    TristateMixed: -2,
	    TristateTrue: -1
	},
    WshExecStatus:
	{
	    WshRunning: 0,
	    WshFinished: 1,
	    WshFailed: 2
	},
    WshWindowStyle:
	{
	    WshHide: 0,
	    WshNormalFocus: 1,
	    WshMinimizedFocus: 2,
	    WshMaximizedFocus: 3,
	    WshNormalNoFocus: 4,
	    WshMinimizedNoFocus: 6
	}
};