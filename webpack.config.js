module.exports = {
    entry: {
        main: ['./polyfill.js', './test.js']
    },
    output: {
        path: __dirname + '/test',
        filename: '[name].test.js'
    }
};
