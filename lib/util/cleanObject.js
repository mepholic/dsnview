// Import libs
var extend = require('node.extend');

// Re-structure a passed in object
module.exports = function(list, idx, moreInfo) {
    var myRoot = list[idx];
    var myObject = myRoot.$;
    var myName = myObject.name;
    delete myObject.name;

    // Create a new object and copy the modified object to it
    var newObject = {};
    newObject[myName] = myObject;

    // Add more info if provided
    if (typeof moreInfo === 'object') {
        newObject[myName] = extend(newObject[myName], moreInfo);
    };

    return newObject;
};
