module.exports = function() {
	return this.getFiles(function(f) {
			return (f instanceof Folder););
	}