require('core-js/fn/object/assign');

// Add support for all files in the test directory
const testsContext = require.context('.', true, /(Test\.js$)|(Helper\.js$)|(-test\.js$)/);
testsContext.keys().forEach(testsContext);
