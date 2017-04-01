/**
 * Seek files with given in extensionsList extensions in folder, and return them as an array.
 * @param {folder}          folder         - ExtendScript folder reference.
 * @param {string|string[]} extensionsList - list of files extensions to search in folder.
 *
 * @return {file[]} array of ExtendScript files objects.
 */
module.exports = function(folder, extensionsList) {
	//проверка на тип входного параметра folder
	if (extensionsList.__class__ === 'String') {
		extensionsList = [extensionsList];
	}
	if (extensionsList.__class__ === 'Array') {
		var r = new RegExp('\.(' + extensionsList.join('|') + ')$');
		var callback = function(f) {
			return (f instanceof File) && (r).test(f.absoluteURI.toLowerCase());
		};
		return folder.getFiles(callback);
	}
}