module.exports = {
	entry: {
		main: ['./polyfill.js', './index.js']
	},
	output: {
		path: __dirname + '/test',
		filename: '[name].test.js'
	}
};