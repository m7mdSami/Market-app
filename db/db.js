var Orders = require('./Orders.json');
var Products = require('./Products.json');
var Users = require('./Users.json');
// and so on

module.exports = function () {
    return {
        Orders: Orders,
        Products: Products,
        Users: Users,
        // and so on
    }
}