module.exports = function(extCase) {
	return this.name.slice((this.name.lastIndexOf(".") - 1 >>> 0) + 2);
}