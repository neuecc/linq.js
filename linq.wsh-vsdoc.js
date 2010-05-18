if (typeof Linq == "undefined") Linq = {};
Linq.Wsh = W =
{
    // Original Methods

    ConnectObject: function(object, prefix)
    {
        /// <param name="object" type="String"></param>
        /// <param name="prefix" type="Optional:String"></param>
        /// <returns type="void"></returns>
    },
    CreateObject: function(progID, prefix)
    {
        /// <param name="progID" type="String"></param>
        /// <param name="prefix" type="Optional:String"></param>
    },
    DisconnectObject: function(object)
    {
        /// <param name="object" type="String"></param>
        /// <returns type="void"></returns>
    },
    Echo: function(pArgs)
    {
        /// <param name="pArgs" type="params String"></param>
        /// <returns type="void"></returns>
    },
    GetObject: function(pathname, progID, prefix)
    {
        /// <param name="pathname" type="String"></param>
        /// <param name="progID" type="Optional:String"></param>
        /// <param name="prefix" type="Optional:String"></param>
    },
    Quit: function(exitCode)
    {
        /// <param name="exitCode" type="Optional:Number"></param>
        /// <returns type="void"></returns>
    },
    Sleep: function(time)
    {
        /// <param name="time" type="Optional:Number">Millisecond</param>
        /// <returns type="void"></returns>
    },

    // Original Property

    Application: function()
    {
        /// <returns type="String"></returns>
    },
    Arguments: function()
    {
        /// <returns type="W.__IntelliSense.Arguments"></returns>
    },
    BuildVersion: function()
    {
        /// <returns type="Number"></returns>
    },
    FullName: function()
    {
        /// <returns type="String"></returns>
    },
    Interactive: function()
    {
        /// <returns type="Boolean"></returns>
    },
    Name: function()
    {
        /// <returns type="String"></returns>
    },
    Path: function()
    {
        /// <returns type="String"></returns>
    },
    ScriptName: function()
    {
        /// <returns type="String"></returns>
    },
    ScriptFullName: function()
    {
        /// <returns type="String"></returns>
    },
    StdErr: function()
    {
        /// <returns type="W.__IntelliSense.ITextStream"></returns>
    },
    StdIn: function()
    {
        /// <returns type="W.__IntelliSense.ITextStream"></returns>
    },
    StdOut: function()
    {
        /// <returns type="W.__IntelliSense.ITextStream"></returns>
    },
    Timeout: function()
    {
        /// <returns type="Number"></returns>
    },
    Version: function()
    {
        /// <returns type="String"></returns>
    },

    // Additional Methods

    CreateShell: function()
    {
        /// <returns type="W.__IntelliSense.IWshShell"></returns>
    },
    CreateNetwork: function()
    {
        /// <returns type="W.__IntelliSense.Network"></returns>
    },
    CreateFileSystem: function()
    {
        /// <returns type="W.__IntelliSense.FileSystem"></returns>
    },
    InputBox: function(title, description, defaultText)
    {
        /// <param name="title" type="Optional:String"></param>
        /// <param name="description" type="Optional:String"></param>
        /// <param name="defaultText" type="Optional:String"></param>
        /// <returns type="String"></returns>
    },
    MsgBox: function(prompt, buttons, title)
    {
        /// <summary>result number constant => W.Enum.MsgBox.Result</summary>
        /// <param name="prompt" type="String"></param>
        /// <param name="buttons" type="Optional:Number">W.Enum.MsgBox.Button</param>
        /// <param name="title" type="Optional:String"></param>
        /// <returns type="Number"></returns>
    },
    ScriptDirectory: function()
    {
        /// <returns type="String"></returns>
    },
    Using: function(stream, action)
    {
        /// <param name="stream" type="Stream">stream must be implemented "Close" method.</param>
        /// <param name="action" type="Action&lt;Stream>"></param>
        /// <returns type="void"></returns>
    },

    // Bytes

    Bytes:
    {
        At: function(bytes, index)
        {
            /// <param name="bytes" type="Byte[]"></param>
            /// <param name="index" type="Number"></param>
            /// <returns type="Number"></returns>
        },

        Count: function(bytes)
        {
            /// <param name="bytes" type="Byte[]"></param>
            /// <returns type="Number"></returns>
        },

        FromBase64String: function(base64str)
        {
            /// <param name="base64str" type="String"></param>
            /// <returns type="Byte[]"></returns>
        },

        ToBase64String: function(bytes)
        {
            /// <param name="bytes" type="Byte[]"></param>
            /// <returns type="String"></returns>
        },

        ToBytesFromArray: function(intArray)
        {
            /// <param name="intArray" type="Number[]_or_Linq.Object"></param>
            /// <returns type="Byte[]"></returns>
        },

        ToBytesFromString: function(input)
        {
            /// <summary>UTF8Encoding.GetBytes</summary>
            /// <param name="input" type="String"></param>
            /// <returns type="Byte[]"></returns>
        },

        ToLinq: function(bytes)
        {
            /// <param name="bytes" type="Byte[]"></param>
            /// <returns type="Linq.Object"></returns>
        },
        
        ToMD5String: function(bytes)
        {
            /// <param name="bytes" type="Byte[]"></param>
            /// <returns type="String"></returns>
        },
        
        ToSHA1String: function(bytes)
        {
            /// <param name="bytes" type="Byte[]"></param>
            /// <returns type="String"></returns>
        }
    }
};

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

// IntelliSense dummy object

// Linq.Wsh.__IntelliSense = {}
// TODO:Delete
Linq.Wsh.__IntelliSense =
{
    Shell: function() { },
    Network: function() { },
    FileSystem: function() { },
    Environment: function() { },
    Shortcut: function() { },
    Folder: function() { },
    ITextStream: function() { },
    Arguments: function() { }
};

Linq.Wsh.__IntelliSense.IWshShell = function() { }
Linq.Wsh.__IntelliSense.IWshShell.prototype =
{
    CurrentDirectory: "",
    Environment: function(type)
    {
        /// <param name="type" type="String">W.Enum.Environment</param>
        /// <returns type="W.__IntelliSense.Environment"></returns>
    },
    SpecialFolders: function(folderName)
    {
        /// <param name="folderName" type="String">W.Enum.SpecialFolder</param>
        /// <returns type="String"></returns>
    },
    AppActivate: function(app, wait)
    {
        /// <param name="app" type="String"></param>
        /// <param name="wait" type="Optional:Boolean"></param>
        /// <returns type="Boolean"></returns>
    },
    CreateShortcut: function(pathLink)
    {
        /// <param name="pathLink" type="String"></param>
        /// <returns type="W.__IntelliSense.Shortcut"></returns>
    },
    Exec: function(command)
    {
        // TODO:return IWsh___
    },
    ExpandEnvironmentStrings: function(src)
    {
        /// <param name="src" type="String">W.Enum.EnvironmentSrc</param>
        /// <returns type="String"></returns>
    },
    LogEvent: function(type, message, target)
    {
        /// <param name="type" type="Number"></param>
        /// <param name="message" type="String"></param>
        /// <param name="target" type="Optional:String"></param>
        /// <returns type="Boolean"></returns>
    },
    Popup: function(text, secondsToWait, title, type)
    {
        /// <summary>result number constant => W.Enum.Popup.Result</summary>
        /// <param name="text" type="String"></param>
        /// <param name="secondsToWait" type="Optional:Number"></param>
        /// <param name="title" type="Optional:String"></param>
        /// <param name="type" type="Optional:Number">W.Enum.Popup.Button/Icon</param>
        /// <returns type="Number"></returns>
    },
    RegDelete: function(name)
    {
        // TODO:Registry
    },
    RegRead: function(name)
    {
    },
    RegWrite: function(name, value, type)
    {
    },
    Run: function(command, windowStyle, waitOnReturn)
    {
        /// <param name="command" type="String"></param>
        /// <param name="windowStyle" type="Optional:Number">W.Enum.WshWindowStyle</param>
        /// <param name="waitOnReturn" type="Optional:Boolean"></param>
        /// <returns type="Number"></returns>
    },
    SendKeys: function(keys, wait)
    {
        /// <param name="keys" type="String"></param>
        /// <param name="wait" type="Optional:Boolean"></param>
        /// <returns type="void"></returns>
    }
};

Linq.Wsh.__IntelliSense.Environment.prototype =
{
    Item: function(key) { },
    length: 0,
    Count: function() { },
    Remove: function(name) { }
};

Linq.Wsh.__IntelliSense.Shortcut.prototype =
{
    Load: function(pathLink)
    {
        /// <param name="pathLink" type="String"></param>
        /// <returns type="void"></returns>
    },
    Save: function()
    {
        /// <returns type="void"></returns>
    },
    Arguments: "",
    Description: "",
    FullName: "",
    Hotkey: "",
    IconLocation: "",
    RelativePath: "",
    TargetPath: "",
    WindowStyle: 0,
    WorkingDirectory: ""
};

Linq.Wsh.__IntelliSense.FileSystem.prototype =
{
    Drives: null,
    BuildPath: function(path, name)
    {
        /// <param name="path" type="String"></param>
        /// <param name="name" type="String"></param>
        /// <returns type="String"></returns>
    },
    CopyFile: function(source, destination, overwrite)
    {
        /// <param name="source" type="String"></param>
        /// <param name="destination" type="String"></param>
        /// <param name="overwrite" type="Optional:Boolean">default is true</param>
        /// <returns type="void"></returns>
    },
    CopyFolder: function(source, destination, overwrite)
    {
        /// <param name="source" type="String"></param>
        /// <param name="destination" type="String"></param>
        /// <param name="overwrite" type="Optional:Boolean">default is true</param>
        /// <returns type="void"></returns>
    },
    CreateFolder: function(path)
    {
        /// <param name="path" type="String"></param>
        /// <returns type="W.__IntelliSense.Folder"></returns>
    },
    CreateTextFile: function(fileName, isOverwrite, isUnicode)
    {
        /// <param name="fileName" type="String"></param>
        /// <param name="isOverwrite" type="Optional:Boolean">default is false</param>
        /// <param name="isUnicode" type="Optional:Boolean">default is false</param>
        /// <returns type="W.__IntelliSense.ITextStream"></returns>
    },
    DeleteFile: function(fileSpec, force)
    {
    },
    DeleteFolder: function(folderSpec, force)
    {
    },
    DriveExists: function()
    {
    },
    FileExists: function()
    {
    },
    FolderExists: function()
    {
    },
    GetAbsolutePathName: function()
    {
    },
    GetBaseName: function()
    {
    },
    GetDrive: function()
    {
    },
    GetDriveName: function()
    {
    },
    GetExtensionName: function()
    {
    },
    GetFile: function()
    {
    },
    GetFileName: function()
    {
    },
    GetFileVersion: function()
    {
    },
    GetFolder: function()
    {
    },
    GetParentFolderName: function()
    {
    },
    GetSpecialFolder: function()
    {
    },
    GetStandardStream: function()
    {
    },
    GetTempName: function()
    {
    },
    MoveFile: function()
    {
    },
    MoveFolder: function()
    {
    },
    OpenTextFile: function()
    {
    }
};

Linq.Wsh.__IntelliSense.Folder.prototype =
{
    Copy: function(destination, overWriteFiles)
    {
        /// <param name="destination" type="String"></param>
        /// <param name="overWriteFiles" type="Optional:Boolean">default is true</param>
        /// <returns type="void"></returns>   
    },
    CreateTextFile: function(fileName, overWrite, u)
    {
        //TODO:
    },
    Delete: function(force)
    {
        /// <param name="force" type="Boolean">default is false</param>
        /// <returns type="void"></returns>   
    },
    Move: function(destination)
    {
        /// <param name="destination" type="String"></param>
        /// <returns type="void"></returns>   
    },
    Attributes: 0,
    DateCreated: Date.prototype,
    DateLastAccessed: Date.prototype,
    DateLastModified: Date.prototype,
    Drive: null,
    Files: null,
    IsRootFolder: true,
    Name: "",
    ParentFolder: null,
    Path: "",
    ShortName: "",
    ShortPath: "",
    Size: 0,
    SubFolders: null,
    Type: ""
};

Linq.Wsh.__IntelliSense.ITextStream = function() { }
Linq.Wsh.__IntelliSense.ITextStream.prototype =
{
    AtEndOfLine: true,
    AtEndOfStream: true,
    Column: 0,
    Line: 0,
    Close: function()
    {
        /// <returns type="void"></returns>
    },
    Read: function(characters)
    {
        /// <param name="characters" type="Number"></param>
        /// <returns type="String"></returns>
    },
    ReadAll: function()
    {
        /// <returns type="String"></returns>
    },
    ReadLine: function()
    {
        /// <returns type="String"></returns>
    },
    Skip: function(characters)
    {
        /// <param name="characters" type="Number"></param>
        /// <returns type="void"></returns>
    },
    SkipLine: function()
    {
        /// <returns type="void"></returns>
    },
    Write: function(text)
    {
        /// <param name="text" type="String"></param>
        /// <returns type="void"></returns>
    },
    WriteBlankLines: function(lines)
    {
        /// <param name="lines" type="Number"></param>
        /// <returns type="void"></returns>
    },
    WriteLine: function(text)
    {
        /// <param name="text" type="Optional:String"></param>
        /// <returns type="void"></returns>
    }
};

Linq.Wsh.__IntelliSense.Arguments.prototype =
{
    Item: function(index)
    {
        /// <param name="index" type="Number"></param>
        /// <returns type="String"></returns>
    },
    Named: null,
    Unnamed: null,
    length: 0
};