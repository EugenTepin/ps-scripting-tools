if (!Folder.prototype.getFolders) {
	Folder.prototype.getFolders = require('./getFolders.js');
}

if (!Folder.prototype.getFilesByExtension) {
	Folder.prototype.getFilesByExtension = require('./getFilesByExtension.js');
}