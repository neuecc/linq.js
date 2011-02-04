Drive = function() { }
Drive.prototype =
{
	AvailableSpace: Object,
	DriveLetter: "",
	DriveType: DriveTypeConst,
	FileSystem: "",
	FreeSpace: Object,
	IsReady: true,
	Path: "",
	RootFolder: Folder,
	SerialNumber: 0,
	ShareName: "",
	TotalSize: Object,
	VolumeName: ""
}

Drives = function() { }
Drives.prototype =
{
	Count: 0,
	Item: Drive
}

File = function() { }
File.prototype =
{
	Attributes: FileAttribute,
	DateCreated: Date.prototype,
	DateLastAccessed: Date.prototype,
	DateLastModified: Date.prototype,
	Drive: Drive,
	Name: "",
	ParentFolder: Folder,
	Path: "",
	ShortName: "",
	ShortPath: "",
	Size: Object,
	Type: "",
	Copy: function(Destination, OverWriteFiles)
	{
		/// <param name="Destination" type="String"></param>
		/// <param name="OverWriteFiles" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	Delete: function(Force)
	{
		/// <param name="Force" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	Move: function(Destination)
	{
		/// <param name="Destination" type="String"></param>
		/// <returns type="void"></returns>
	},
	OpenAsTextStream: function(IOMode, Format)
	{
		/// <param name="IOMode" type="Optional:IOMode"></param>
		/// <param name="Format" type="Optional:Tristate"></param>
		/// <returns type="TextStream"></returns>
	}
}

Files = function() { }
Files.prototype =
{
	Count: 0,
	Item: File
}

FileSystemObject = function() { }
FileSystemObject.prototype =
{
	Drives: Drives,
	BuildPath: function(Path, Name)
	{
		/// <param name="Path" type="String"></param>
		/// <param name="Name" type="String"></param>
		/// <returns type="String"></returns>
	},
	CopyFile: function(Source, Destination, OverWriteFiles)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <param name="OverWriteFiles" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	CopyFolder: function(Source, Destination, OverWriteFiles)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <param name="OverWriteFiles" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	CreateFolder: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="Folder"></returns>
	},
	CreateTextFile: function(FileName, Overwrite, Unicode)
	{
		/// <param name="FileName" type="String"></param>
		/// <param name="Overwrite" type="Optional:Boolean"></param>
		/// <param name="Unicode" type="Optional:Boolean"></param>
		/// <returns type="TextStream"></returns>
	},
	DeleteFile: function(FileSpec, Force)
	{
		/// <param name="FileSpec" type="String"></param>
		/// <param name="Force" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	DeleteFolder: function(FolderSpec, Force)
	{
		/// <param name="FolderSpec" type="String"></param>
		/// <param name="Force" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	DriveExists: function(DriveSpec)
	{
		/// <param name="DriveSpec" type="String"></param>
		/// <returns type="Boolean"></returns>
	},
	FileExists: function(FileSpec)
	{
		/// <param name="FileSpec" type="String"></param>
		/// <returns type="Boolean"></returns>
	},
	FolderExists: function(FolderSpec)
	{
		/// <param name="FolderSpec" type="String"></param>
		/// <returns type="Boolean"></returns>
	},
	GetAbsolutePathName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetBaseName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetDrive: function(DriveSpec)
	{
		/// <param name="DriveSpec" type="String"></param>
		/// <returns type="Drive"></returns>
	},
	GetDriveName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetExtensionName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetFile: function(FilePath)
	{
		/// <param name="FilePath" type="String"></param>
		/// <returns type="File"></returns>
	},
	GetFileName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetFileVersion: function(FileName)
	{
		/// <param name="FileName" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetFolder: function(FolderPath)
	{
		/// <param name="FolderPath" type="String"></param>
		/// <returns type="Folder"></returns>
	},
	GetParentFolderName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetSpecialFolder: function(SpecialFolder)
	{
		/// <param name="SpecialFolder" type="SpecialFolderConst"></param>
		/// <returns type="Folder"></returns>
	},
	GetStandardStream: function(StandardStreamType, Unicode)
	{
		/// <param name="StandardStreamType" type="StandardStreamTypes"></param>
		/// <param name="Unicode" type="Optional:Boolean"></param>
		/// <returns type="TextStream"></returns>
	},
	GetTempName: function()
	{
		/// <returns type="String"></returns>
	},
	MoveFile: function(Source, Destination)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <returns type="void"></returns>
	},
	MoveFolder: function(Source, Destination)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <returns type="void"></returns>
	},
	OpenTextFile: function(FileName, IOMode, Create, Format)
	{
		/// <param name="FileName" type="String"></param>
		/// <param name="IOMode" type="Optional:IOMode"></param>
		/// <param name="Create" type="Optional:Boolean"></param>
		/// <param name="Format" type="Optional:Tristate"></param>
		/// <returns type="TextStream"></returns>
	}
}

Folder = function() { }
Folder.prototype =
{
	Attributes: FileAttribute,
	DateCreated: Date.prototype,
	DateLastAccessed: Date.prototype,
	DateLastModified: Date.prototype,
	Drive: Drive,
	Files: Files,
	IsRootFolder: true,
	Name: "",
	ParentFolder: Folder,
	Path: "",
	ShortName: "",
	ShortPath: "",
	Size: Object,
	SubFolders: Folders,
	Type: "",
	Copy: function(Destination, OverWriteFiles)
	{
		/// <param name="Destination" type="String"></param>
		/// <param name="OverWriteFiles" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	CreateTextFile: function(FileName, Overwrite, Unicode)
	{
		/// <param name="FileName" type="String"></param>
		/// <param name="Overwrite" type="Optional:Boolean"></param>
		/// <param name="Unicode" type="Optional:Boolean"></param>
		/// <returns type="TextStream"></returns>
	},
	Delete: function(Force)
	{
		/// <param name="Force" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	Move: function(Destination)
	{
		/// <param name="Destination" type="String"></param>
		/// <returns type="void"></returns>
	}
}

Folders = function() { }
Folders.prototype =
{
	Count: 0,
	Item: Folder,
	Add: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="Folder"></returns>
	}
}

IDrive = function() { }
IDrive.prototype =
{
	AvailableSpace: Object,
	DriveLetter: "",
	DriveType: DriveTypeConst,
	FileSystem: "",
	FreeSpace: Object,
	IsReady: true,
	Path: "",
	RootFolder: Folder,
	SerialNumber: 0,
	ShareName: "",
	TotalSize: Object,
	VolumeName: ""
}

IDriveCollection = function() { }
IDriveCollection.prototype =
{
	Count: 0,
	Item: Drive
}

IFile = function() { }
IFile.prototype =
{
	Attributes: FileAttribute,
	DateCreated: Date.prototype,
	DateLastAccessed: Date.prototype,
	DateLastModified: Date.prototype,
	Drive: Drive,
	Name: "",
	ParentFolder: Folder,
	Path: "",
	ShortName: "",
	ShortPath: "",
	Size: Object,
	Type: "",
	Copy: function(Destination, OverWriteFiles)
	{
		/// <param name="Destination" type="String"></param>
		/// <param name="OverWriteFiles" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	Delete: function(Force)
	{
		/// <param name="Force" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	Move: function(Destination)
	{
		/// <param name="Destination" type="String"></param>
		/// <returns type="void"></returns>
	},
	OpenAsTextStream: function(IOMode, Format)
	{
		/// <param name="IOMode" type="Optional:IOMode"></param>
		/// <param name="Format" type="Optional:Tristate"></param>
		/// <returns type="TextStream"></returns>
	}
}

IFileCollection = function() { }
IFileCollection.prototype =
{
	Count: 0,
	Item: File
}

IFileSystem = function() { }
IFileSystem.prototype =
{
	Drives: Drives,
	BuildPath: function(Path, Name)
	{
		/// <param name="Path" type="String"></param>
		/// <param name="Name" type="String"></param>
		/// <returns type="String"></returns>
	},
	CopyFile: function(Source, Destination, OverWriteFiles)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <param name="OverWriteFiles" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	CopyFolder: function(Source, Destination, OverWriteFiles)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <param name="OverWriteFiles" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	CreateFolder: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="Folder"></returns>
	},
	CreateTextFile: function(FileName, Overwrite, Unicode)
	{
		/// <param name="FileName" type="String"></param>
		/// <param name="Overwrite" type="Optional:Boolean"></param>
		/// <param name="Unicode" type="Optional:Boolean"></param>
		/// <returns type="TextStream"></returns>
	},
	DeleteFile: function(FileSpec, Force)
	{
		/// <param name="FileSpec" type="String"></param>
		/// <param name="Force" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	DeleteFolder: function(FolderSpec, Force)
	{
		/// <param name="FolderSpec" type="String"></param>
		/// <param name="Force" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	DriveExists: function(DriveSpec)
	{
		/// <param name="DriveSpec" type="String"></param>
		/// <returns type="Boolean"></returns>
	},
	FileExists: function(FileSpec)
	{
		/// <param name="FileSpec" type="String"></param>
		/// <returns type="Boolean"></returns>
	},
	FolderExists: function(FolderSpec)
	{
		/// <param name="FolderSpec" type="String"></param>
		/// <returns type="Boolean"></returns>
	},
	GetAbsolutePathName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetBaseName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetDrive: function(DriveSpec)
	{
		/// <param name="DriveSpec" type="String"></param>
		/// <returns type="Drive"></returns>
	},
	GetDriveName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetExtensionName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetFile: function(FilePath)
	{
		/// <param name="FilePath" type="String"></param>
		/// <returns type="File"></returns>
	},
	GetFileName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetFolder: function(FolderPath)
	{
		/// <param name="FolderPath" type="String"></param>
		/// <returns type="Folder"></returns>
	},
	GetParentFolderName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetSpecialFolder: function(SpecialFolder)
	{
		/// <param name="SpecialFolder" type="SpecialFolderConst"></param>
		/// <returns type="Folder"></returns>
	},
	GetTempName: function()
	{
		/// <returns type="String"></returns>
	},
	MoveFile: function(Source, Destination)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <returns type="void"></returns>
	},
	MoveFolder: function(Source, Destination)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <returns type="void"></returns>
	},
	OpenTextFile: function(FileName, IOMode, Create, Format)
	{
		/// <param name="FileName" type="String"></param>
		/// <param name="IOMode" type="Optional:IOMode"></param>
		/// <param name="Create" type="Optional:Boolean"></param>
		/// <param name="Format" type="Optional:Tristate"></param>
		/// <returns type="TextStream"></returns>
	}
}

IFileSystem3 = function() { }
IFileSystem3.prototype =
{
	Drives: Drives,
	BuildPath: function(Path, Name)
	{
		/// <param name="Path" type="String"></param>
		/// <param name="Name" type="String"></param>
		/// <returns type="String"></returns>
	},
	CopyFile: function(Source, Destination, OverWriteFiles)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <param name="OverWriteFiles" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	CopyFolder: function(Source, Destination, OverWriteFiles)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <param name="OverWriteFiles" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	CreateFolder: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="Folder"></returns>
	},
	CreateTextFile: function(FileName, Overwrite, Unicode)
	{
		/// <param name="FileName" type="String"></param>
		/// <param name="Overwrite" type="Optional:Boolean"></param>
		/// <param name="Unicode" type="Optional:Boolean"></param>
		/// <returns type="TextStream"></returns>
	},
	DeleteFile: function(FileSpec, Force)
	{
		/// <param name="FileSpec" type="String"></param>
		/// <param name="Force" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	DeleteFolder: function(FolderSpec, Force)
	{
		/// <param name="FolderSpec" type="String"></param>
		/// <param name="Force" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	DriveExists: function(DriveSpec)
	{
		/// <param name="DriveSpec" type="String"></param>
		/// <returns type="Boolean"></returns>
	},
	FileExists: function(FileSpec)
	{
		/// <param name="FileSpec" type="String"></param>
		/// <returns type="Boolean"></returns>
	},
	FolderExists: function(FolderSpec)
	{
		/// <param name="FolderSpec" type="String"></param>
		/// <returns type="Boolean"></returns>
	},
	GetAbsolutePathName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetBaseName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetDrive: function(DriveSpec)
	{
		/// <param name="DriveSpec" type="String"></param>
		/// <returns type="Drive"></returns>
	},
	GetDriveName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetExtensionName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetFile: function(FilePath)
	{
		/// <param name="FilePath" type="String"></param>
		/// <returns type="File"></returns>
	},
	GetFileName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetFileVersion: function(FileName)
	{
		/// <param name="FileName" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetFolder: function(FolderPath)
	{
		/// <param name="FolderPath" type="String"></param>
		/// <returns type="Folder"></returns>
	},
	GetParentFolderName: function(Path)
	{
		/// <param name="Path" type="String"></param>
		/// <returns type="String"></returns>
	},
	GetSpecialFolder: function(SpecialFolder)
	{
		/// <param name="SpecialFolder" type="SpecialFolderConst"></param>
		/// <returns type="Folder"></returns>
	},
	GetStandardStream: function(StandardStreamType, Unicode)
	{
		/// <param name="StandardStreamType" type="StandardStreamTypes"></param>
		/// <param name="Unicode" type="Optional:Boolean"></param>
		/// <returns type="TextStream"></returns>
	},
	GetTempName: function()
	{
		/// <returns type="String"></returns>
	},
	MoveFile: function(Source, Destination)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <returns type="void"></returns>
	},
	MoveFolder: function(Source, Destination)
	{
		/// <param name="Source" type="String"></param>
		/// <param name="Destination" type="String"></param>
		/// <returns type="void"></returns>
	},
	OpenTextFile: function(FileName, IOMode, Create, Format)
	{
		/// <param name="FileName" type="String"></param>
		/// <param name="IOMode" type="Optional:IOMode"></param>
		/// <param name="Create" type="Optional:Boolean"></param>
		/// <param name="Format" type="Optional:Tristate"></param>
		/// <returns type="TextStream"></returns>
	}
}

IFolder = function() { }
IFolder.prototype =
{
	Attributes: FileAttribute,
	DateCreated: Date.prototype,
	DateLastAccessed: Date.prototype,
	DateLastModified: Date.prototype,
	Drive: Drive,
	Files: Files,
	IsRootFolder: true,
	Name: "",
	ParentFolder: Folder,
	Path: "",
	ShortName: "",
	ShortPath: "",
	Size: Object,
	SubFolders: Folders,
	Type: "",
	Copy: function(Destination, OverWriteFiles)
	{
		/// <param name="Destination" type="String"></param>
		/// <param name="OverWriteFiles" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	CreateTextFile: function(FileName, Overwrite, Unicode)
	{
		/// <param name="FileName" type="String"></param>
		/// <param name="Overwrite" type="Optional:Boolean"></param>
		/// <param name="Unicode" type="Optional:Boolean"></param>
		/// <returns type="TextStream"></returns>
	},
	Delete: function(Force)
	{
		/// <param name="Force" type="Optional:Boolean"></param>
		/// <returns type="void"></returns>
	},
	Move: function(Destination)
	{
		/// <param name="Destination" type="String"></param>
		/// <returns type="void"></returns>
	}
}

IFolderCollection = function() { }
IFolderCollection.prototype =
{
	Count: 0,
	Item: Folder,
	Add: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="Folder"></returns>
	}
}

ITextStream = function() { }
ITextStream.prototype =
{
	AtEndOfLine: true,
	AtEndOfStream: true,
	Column: 0,
	Line: 0,
	Close: function()
	{
		/// <returns type="void"></returns>
	},
	Read: function(Characters)
	{
		/// <param name="Characters" type="Number"></param>
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
	Skip: function(Characters)
	{
		/// <param name="Characters" type="Number"></param>
		/// <returns type="void"></returns>
	},
	SkipLine: function()
	{
		/// <returns type="void"></returns>
	},
	Write: function(Text)
	{
		/// <param name="Text" type="String"></param>
		/// <returns type="void"></returns>
	},
	WriteBlankLines: function(Lines)
	{
		/// <param name="Lines" type="Number"></param>
		/// <returns type="void"></returns>
	},
	WriteLine: function(Text)
	{
		/// <param name="Text" type="Optional:String"></param>
		/// <returns type="void"></returns>
	}
}

IWshCollection = function() { }
IWshCollection.prototype =
{
	length: 0,
	Count: function()
	{
		/// <returns type="Number"></returns>
	},
	Item: function(Index)
	{
		/// <param name="Index" type="Object&"></param>
		/// <returns type="Object"></returns>
	}
}

IWshCollection_Class = function() { }
IWshCollection_Class.prototype =
{
	length: 0,
	Count: function()
	{
		/// <returns type="Number"></returns>
	},
	Item: function(Index)
	{
		/// <param name="Index" type="Object&"></param>
		/// <returns type="Object"></returns>
	}
}

IWshEnvironment = function() { }
IWshEnvironment.prototype =
{
	Item: "",
	length: 0,
	Count: function()
	{
		/// <returns type="Number"></returns>
	},
	Remove: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	}
}

IWshEnvironment_Class = function() { }
IWshEnvironment_Class.prototype =
{
	Item: "",
	length: 0,
	Count: function()
	{
		/// <returns type="Number"></returns>
	},
	Remove: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	}
}

IWshExec = function() { }
IWshExec.prototype =
{
	ExitCode: 0,
	ProcessID: 0,
	Status: WshExecStatus,
	StdErr: TextStream,
	StdIn: TextStream,
	StdOut: TextStream,
	Terminate: function()
	{
		/// <returns type="void"></returns>
	}
}

IWshNetwork = function() { }
IWshNetwork.prototype =
{
	ComputerName: "",
	Organization: "",
	Site: "",
	UserDomain: "",
	UserName: "",
	UserProfile: "",
	AddPrinterConnection: function(LocalName, RemoteName, UpdateProfile, UserName, Password)
	{
		/// <param name="LocalName" type="String"></param>
		/// <param name="RemoteName" type="String"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <param name="UserName" type="Optional:Object&"></param>
		/// <param name="Password" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	EnumNetworkDrives: function()
	{
		/// <returns type="IWshCollection"></returns>
	},
	EnumPrinterConnections: function()
	{
		/// <returns type="IWshCollection"></returns>
	},
	MapNetworkDrive: function(LocalName, RemoteName, UpdateProfile, UserName, Password)
	{
		/// <param name="LocalName" type="String"></param>
		/// <param name="RemoteName" type="String"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <param name="UserName" type="Optional:Object&"></param>
		/// <param name="Password" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	RemoveNetworkDrive: function(Name, Force, UpdateProfile)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Force" type="Optional:Object&"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	RemovePrinterConnection: function(Name, Force, UpdateProfile)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Force" type="Optional:Object&"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	SetDefaultPrinter: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	}
}

IWshNetwork_Class = function() { }
IWshNetwork_Class.prototype =
{
	ComputerName: "",
	Organization: "",
	Site: "",
	UserDomain: "",
	UserName: "",
	UserProfile: "",
	AddPrinterConnection: function(LocalName, RemoteName, UpdateProfile, UserName, Password)
	{
		/// <param name="LocalName" type="String"></param>
		/// <param name="RemoteName" type="String"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <param name="UserName" type="Optional:Object&"></param>
		/// <param name="Password" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	AddWindowsPrinterConnection: function(PrinterName, DriverName, Port)
	{
		/// <param name="PrinterName" type="String"></param>
		/// <param name="DriverName" type="Optional:String"></param>
		/// <param name="Port" type="Optional:String"></param>
		/// <returns type="void"></returns>
	},
	EnumNetworkDrives: function()
	{
		/// <returns type="IWshCollection"></returns>
	},
	EnumPrinterConnections: function()
	{
		/// <returns type="IWshCollection"></returns>
	},
	MapNetworkDrive: function(LocalName, RemoteName, UpdateProfile, UserName, Password)
	{
		/// <param name="LocalName" type="String"></param>
		/// <param name="RemoteName" type="String"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <param name="UserName" type="Optional:Object&"></param>
		/// <param name="Password" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	RemoveNetworkDrive: function(Name, Force, UpdateProfile)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Force" type="Optional:Object&"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	RemovePrinterConnection: function(Name, Force, UpdateProfile)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Force" type="Optional:Object&"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	SetDefaultPrinter: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	}
}

IWshNetwork2 = function() { }
IWshNetwork2.prototype =
{
	ComputerName: "",
	Organization: "",
	Site: "",
	UserDomain: "",
	UserName: "",
	UserProfile: "",
	AddPrinterConnection: function(LocalName, RemoteName, UpdateProfile, UserName, Password)
	{
		/// <param name="LocalName" type="String"></param>
		/// <param name="RemoteName" type="String"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <param name="UserName" type="Optional:Object&"></param>
		/// <param name="Password" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	AddWindowsPrinterConnection: function(PrinterName, DriverName, Port)
	{
		/// <param name="PrinterName" type="String"></param>
		/// <param name="DriverName" type="Optional:String"></param>
		/// <param name="Port" type="Optional:String"></param>
		/// <returns type="void"></returns>
	},
	EnumNetworkDrives: function()
	{
		/// <returns type="IWshCollection"></returns>
	},
	EnumPrinterConnections: function()
	{
		/// <returns type="IWshCollection"></returns>
	},
	MapNetworkDrive: function(LocalName, RemoteName, UpdateProfile, UserName, Password)
	{
		/// <param name="LocalName" type="String"></param>
		/// <param name="RemoteName" type="String"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <param name="UserName" type="Optional:Object&"></param>
		/// <param name="Password" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	RemoveNetworkDrive: function(Name, Force, UpdateProfile)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Force" type="Optional:Object&"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	RemovePrinterConnection: function(Name, Force, UpdateProfile)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Force" type="Optional:Object&"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	SetDefaultPrinter: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	}
}

IWshShell = function() { }
IWshShell.prototype =
{
	Environment: IWshEnvironment,
	SpecialFolders: IWshCollection,
	CreateShortcut: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="Object"></returns>
	},
	ExpandEnvironmentStrings: function(Src)
	{
		/// <param name="Src" type="String"></param>
		/// <returns type="String"></returns>
	},
	Popup: function(Text, SecondsToWait, Title, Type)
	{
		/// <param name="Text" type="String"></param>
		/// <param name="SecondsToWait" type="Optional:Object&"></param>
		/// <param name="Title" type="Optional:Object&"></param>
		/// <param name="Type" type="Optional:Object&"></param>
		/// <returns type="Number"></returns>
	},
	RegDelete: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	},
	RegRead: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="Object"></returns>
	},
	RegWrite: function(Name, Value, Type)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Value" type="Object&"></param>
		/// <param name="Type" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	Run: function(Command, WindowStyle, WaitOnReturn)
	{
		/// <param name="Command" type="String"></param>
		/// <param name="WindowStyle" type="Optional:Object&"></param>
		/// <param name="WaitOnReturn" type="Optional:Object&"></param>
		/// <returns type="Number"></returns>
	}
}

IWshShell_Class = function() { }
IWshShell_Class.prototype =
{
	CurrentDirectory: "",
	Environment: IWshEnvironment,
	SpecialFolders: IWshCollection,
	AppActivate: function(App, Wait)
	{
		/// <param name="App" type="Object&"></param>
		/// <param name="Wait" type="Optional:Object&"></param>
		/// <returns type="Boolean"></returns>
	},
	CreateShortcut: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="Object"></returns>
	},
	Exec: function(Command)
	{
		/// <param name="Command" type="String"></param>
		/// <returns type="WshExec"></returns>
	},
	ExpandEnvironmentStrings: function(Src)
	{
		/// <param name="Src" type="String"></param>
		/// <returns type="String"></returns>
	},
	LogEvent: function(Type, Message, Target)
	{
		/// <param name="Type" type="Object&"></param>
		/// <param name="Message" type="String"></param>
		/// <param name="Target" type="Optional:String"></param>
		/// <returns type="Boolean"></returns>
	},
	Popup: function(Text, SecondsToWait, Title, Type)
	{
		/// <param name="Text" type="String"></param>
		/// <param name="SecondsToWait" type="Optional:Object&"></param>
		/// <param name="Title" type="Optional:Object&"></param>
		/// <param name="Type" type="Optional:Object&"></param>
		/// <returns type="Number"></returns>
	},
	RegDelete: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	},
	RegRead: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="Object"></returns>
	},
	RegWrite: function(Name, Value, Type)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Value" type="Object&"></param>
		/// <param name="Type" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	Run: function(Command, WindowStyle, WaitOnReturn)
	{
		/// <param name="Command" type="String"></param>
		/// <param name="WindowStyle" type="Optional:Object&"></param>
		/// <param name="WaitOnReturn" type="Optional:Object&"></param>
		/// <returns type="Number"></returns>
	},
	SendKeys: function(Keys, Wait)
	{
		/// <param name="Keys" type="String"></param>
		/// <param name="Wait" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	}
}

IWshShell2 = function() { }
IWshShell2.prototype =
{
	Environment: IWshEnvironment,
	SpecialFolders: IWshCollection,
	AppActivate: function(App, Wait)
	{
		/// <param name="App" type="Object&"></param>
		/// <param name="Wait" type="Optional:Object&"></param>
		/// <returns type="Boolean"></returns>
	},
	CreateShortcut: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="Object"></returns>
	},
	ExpandEnvironmentStrings: function(Src)
	{
		/// <param name="Src" type="String"></param>
		/// <returns type="String"></returns>
	},
	LogEvent: function(Type, Message, Target)
	{
		/// <param name="Type" type="Object&"></param>
		/// <param name="Message" type="String"></param>
		/// <param name="Target" type="Optional:String"></param>
		/// <returns type="Boolean"></returns>
	},
	Popup: function(Text, SecondsToWait, Title, Type)
	{
		/// <param name="Text" type="String"></param>
		/// <param name="SecondsToWait" type="Optional:Object&"></param>
		/// <param name="Title" type="Optional:Object&"></param>
		/// <param name="Type" type="Optional:Object&"></param>
		/// <returns type="Number"></returns>
	},
	RegDelete: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	},
	RegRead: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="Object"></returns>
	},
	RegWrite: function(Name, Value, Type)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Value" type="Object&"></param>
		/// <param name="Type" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	Run: function(Command, WindowStyle, WaitOnReturn)
	{
		/// <param name="Command" type="String"></param>
		/// <param name="WindowStyle" type="Optional:Object&"></param>
		/// <param name="WaitOnReturn" type="Optional:Object&"></param>
		/// <returns type="Number"></returns>
	},
	SendKeys: function(Keys, Wait)
	{
		/// <param name="Keys" type="String"></param>
		/// <param name="Wait" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	}
}

IWshShell3 = function() { }
IWshShell3.prototype =
{
	CurrentDirectory: "",
	Environment: IWshEnvironment,
	SpecialFolders: IWshCollection,
	AppActivate: function(App, Wait)
	{
		/// <param name="App" type="Object&"></param>
		/// <param name="Wait" type="Optional:Object&"></param>
		/// <returns type="Boolean"></returns>
	},
	CreateShortcut: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="Object"></returns>
	},
	Exec: function(Command)
	{
		/// <param name="Command" type="String"></param>
		/// <returns type="WshExec"></returns>
	},
	ExpandEnvironmentStrings: function(Src)
	{
		/// <param name="Src" type="String"></param>
		/// <returns type="String"></returns>
	},
	LogEvent: function(Type, Message, Target)
	{
		/// <param name="Type" type="Object&"></param>
		/// <param name="Message" type="String"></param>
		/// <param name="Target" type="Optional:String"></param>
		/// <returns type="Boolean"></returns>
	},
	Popup: function(Text, SecondsToWait, Title, Type)
	{
		/// <param name="Text" type="String"></param>
		/// <param name="SecondsToWait" type="Optional:Object&"></param>
		/// <param name="Title" type="Optional:Object&"></param>
		/// <param name="Type" type="Optional:Object&"></param>
		/// <returns type="Number"></returns>
	},
	RegDelete: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	},
	RegRead: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="Object"></returns>
	},
	RegWrite: function(Name, Value, Type)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Value" type="Object&"></param>
		/// <param name="Type" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	Run: function(Command, WindowStyle, WaitOnReturn)
	{
		/// <param name="Command" type="String"></param>
		/// <param name="WindowStyle" type="Optional:Object&"></param>
		/// <param name="WaitOnReturn" type="Optional:Object&"></param>
		/// <returns type="Number"></returns>
	},
	SendKeys: function(Keys, Wait)
	{
		/// <param name="Keys" type="String"></param>
		/// <param name="Wait" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	}
}

IWshShortcut = function() { }
IWshShortcut.prototype =
{
	Arguments: "",
	Description: "",
	FullName: "",
	Hotkey: "",
	IconLocation: "",
	RelativePath: "",
	TargetPath: "",
	WindowStyle: 0,
	WorkingDirectory: "",
	Load: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="void"></returns>
	},
	Save: function()
	{
		/// <returns type="void"></returns>
	}
}

IWshShortcut_Class = function() { }
IWshShortcut_Class.prototype =
{
	Arguments: "",
	Description: "",
	FullName: "",
	Hotkey: "",
	IconLocation: "",
	RelativePath: "",
	TargetPath: "",
	WindowStyle: 0,
	WorkingDirectory: "",
	Load: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="void"></returns>
	},
	Save: function()
	{
		/// <returns type="void"></returns>
	}
}

IWshURLShortcut = function() { }
IWshURLShortcut.prototype =
{
	FullName: "",
	TargetPath: "",
	Load: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="void"></returns>
	},
	Save: function()
	{
		/// <returns type="void"></returns>
	}
}

IWshURLShortcut_Class = function() { }
IWshURLShortcut_Class.prototype =
{
	FullName: "",
	TargetPath: "",
	Load: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="void"></returns>
	},
	Save: function()
	{
		/// <returns type="void"></returns>
	}
}

TextStream = function() { }
TextStream.prototype =
{
	AtEndOfLine: true,
	AtEndOfStream: true,
	Column: 0,
	Line: 0,
	Close: function()
	{
		/// <returns type="void"></returns>
	},
	Read: function(Characters)
	{
		/// <param name="Characters" type="Number"></param>
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
	Skip: function(Characters)
	{
		/// <param name="Characters" type="Number"></param>
		/// <returns type="void"></returns>
	},
	SkipLine: function()
	{
		/// <returns type="void"></returns>
	},
	Write: function(Text)
	{
		/// <param name="Text" type="String"></param>
		/// <returns type="void"></returns>
	},
	WriteBlankLines: function(Lines)
	{
		/// <param name="Lines" type="Number"></param>
		/// <returns type="void"></returns>
	},
	WriteLine: function(Text)
	{
		/// <param name="Text" type="Optional:String"></param>
		/// <returns type="void"></returns>
	}
}

WshCollection = function() { }
WshCollection.prototype =
{
	length: 0,
	Count: function()
	{
		/// <returns type="Number"></returns>
	},
	Item: function(Index)
	{
		/// <param name="Index" type="Object&"></param>
		/// <returns type="Object"></returns>
	}
}

WshEnvironment = function() { }
WshEnvironment.prototype =
{
	Item: "",
	length: 0,
	Count: function()
	{
		/// <returns type="Number"></returns>
	},
	Remove: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	}
}

WshExec = function() { }
WshExec.prototype =
{
	ExitCode: 0,
	ProcessID: 0,
	Status: WshExecStatus,
	StdErr: TextStream,
	StdIn: TextStream,
	StdOut: TextStream,
	Terminate: function()
	{
		/// <returns type="void"></returns>
	}
}

WshNetwork = function() { }
WshNetwork.prototype =
{
	ComputerName: "",
	Organization: "",
	Site: "",
	UserDomain: "",
	UserName: "",
	UserProfile: "",
	AddPrinterConnection: function(LocalName, RemoteName, UpdateProfile, UserName, Password)
	{
		/// <param name="LocalName" type="String"></param>
		/// <param name="RemoteName" type="String"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <param name="UserName" type="Optional:Object&"></param>
		/// <param name="Password" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	AddWindowsPrinterConnection: function(PrinterName, DriverName, Port)
	{
		/// <param name="PrinterName" type="String"></param>
		/// <param name="DriverName" type="Optional:String"></param>
		/// <param name="Port" type="Optional:String"></param>
		/// <returns type="void"></returns>
	},
	EnumNetworkDrives: function()
	{
		/// <returns type="IWshCollection"></returns>
	},
	EnumPrinterConnections: function()
	{
		/// <returns type="IWshCollection"></returns>
	},
	MapNetworkDrive: function(LocalName, RemoteName, UpdateProfile, UserName, Password)
	{
		/// <param name="LocalName" type="String"></param>
		/// <param name="RemoteName" type="String"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <param name="UserName" type="Optional:Object&"></param>
		/// <param name="Password" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	RemoveNetworkDrive: function(Name, Force, UpdateProfile)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Force" type="Optional:Object&"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	RemovePrinterConnection: function(Name, Force, UpdateProfile)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Force" type="Optional:Object&"></param>
		/// <param name="UpdateProfile" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	SetDefaultPrinter: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	}
}

WshShell = function() { }
WshShell.prototype =
{
	CurrentDirectory: "",
	Environment: IWshEnvironment,
	SpecialFolders: IWshCollection,
	AppActivate: function(App, Wait)
	{
		/// <param name="App" type="Object&"></param>
		/// <param name="Wait" type="Optional:Object&"></param>
		/// <returns type="Boolean"></returns>
	},
	CreateShortcut: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="Object"></returns>
	},
	Exec: function(Command)
	{
		/// <param name="Command" type="String"></param>
		/// <returns type="WshExec"></returns>
	},
	ExpandEnvironmentStrings: function(Src)
	{
		/// <param name="Src" type="String"></param>
		/// <returns type="String"></returns>
	},
	LogEvent: function(Type, Message, Target)
	{
		/// <param name="Type" type="Object&"></param>
		/// <param name="Message" type="String"></param>
		/// <param name="Target" type="Optional:String"></param>
		/// <returns type="Boolean"></returns>
	},
	Popup: function(Text, SecondsToWait, Title, Type)
	{
		/// <param name="Text" type="String"></param>
		/// <param name="SecondsToWait" type="Optional:Object&"></param>
		/// <param name="Title" type="Optional:Object&"></param>
		/// <param name="Type" type="Optional:Object&"></param>
		/// <returns type="Number"></returns>
	},
	RegDelete: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="void"></returns>
	},
	RegRead: function(Name)
	{
		/// <param name="Name" type="String"></param>
		/// <returns type="Object"></returns>
	},
	RegWrite: function(Name, Value, Type)
	{
		/// <param name="Name" type="String"></param>
		/// <param name="Value" type="Object&"></param>
		/// <param name="Type" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	},
	Run: function(Command, WindowStyle, WaitOnReturn)
	{
		/// <param name="Command" type="String"></param>
		/// <param name="WindowStyle" type="Optional:Object&"></param>
		/// <param name="WaitOnReturn" type="Optional:Object&"></param>
		/// <returns type="Number"></returns>
	},
	SendKeys: function(Keys, Wait)
	{
		/// <param name="Keys" type="String"></param>
		/// <param name="Wait" type="Optional:Object&"></param>
		/// <returns type="void"></returns>
	}
}

WshShortcut = function() { }
WshShortcut.prototype =
{
	Arguments: "",
	Description: "",
	FullName: "",
	Hotkey: "",
	IconLocation: "",
	RelativePath: "",
	TargetPath: "",
	WindowStyle: 0,
	WorkingDirectory: "",
	Load: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="void"></returns>
	},
	Save: function()
	{
		/// <returns type="void"></returns>
	}
}

WshURLShortcut = function() { }
WshURLShortcut.prototype =
{
	FullName: "",
	TargetPath: "",
	Load: function(PathLink)
	{
		/// <param name="PathLink" type="String"></param>
		/// <returns type="void"></returns>
	},
	Save: function()
	{
		/// <returns type="void"></returns>
	}
}