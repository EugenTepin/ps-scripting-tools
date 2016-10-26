module.exports = function(extensionsList) {
	if (extensionsList.__class__ === 'String') {
		extensionsList = [extensionsList];
	}
	if (extensionsList.__class__ === 'Array') {
		var r = new RegExp('\.(' + extensionsList.join('|') + ')$');
		var callback = function(f) {
			return (f instanceof File) && (r).test(f.absoluteURI.toLowerCase());
		};
		return this.getFiles(callback);
	}
}