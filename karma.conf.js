var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        // Which browsers we want to run on
        browsers: ['PhantomJS'],
        singleRun: true,
        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },
        // Karma test runner will use mocha to run tests
        frameworks: ['mocha'],
        // Need to load common bundle files before the tests
        // Run all files that end in .test.jsx in folders under app/tests
        files: ['dist/vendor.bundle.js','dist/index.bundle.js','src/tests/**/*.test.jsx'],
        // Here "webpack" enables to use webpack modules on the tests
        // "sourcemap" enables to use the .jsx files and not the bundles
        preprocessors: {
            'src/tests/**/*.test.jsx': ['webpack', 'sourcemap']
        },
        // How to format the result of the tests
        reporters: ['mocha'],
        // Timeout condition for failure
        client: {
            timeout: '5000'
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
};
