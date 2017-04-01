/**
 * Return array of subfolders (one level down) in folder.
 * @param {folder} folder - ExtendScript folder reference.
 *
 * @return {folder[]} array of ExtendScript folders objects.
 */
module.exports = function(folder) {
	//проверка на тип folder
	return folder.getFiles(
		function(f) {
			return (f instanceof Folder);
		}
	);
}