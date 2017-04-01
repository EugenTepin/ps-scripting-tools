/**
 * Get extension from uri like string.
 * @param {string} fileName - uri like string.
 *
 * @return {string} file extension.
 */
module.exports = function(fileName) {
	//проверка на тип входного параметра
	return fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
}