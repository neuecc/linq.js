IWshRuntimeLibraryEnum =
{
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
}