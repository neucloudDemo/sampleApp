const path = require('path');
const _ = {};
_.resolve = function (dir) {
    return path.join(__dirname, dir);
}
module.exports = _;