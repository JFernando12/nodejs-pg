const store = require("../../../store/db");
// const store = require("../../../store/remote-db");
const controller = require("./controller");

module.exports = controller(store);