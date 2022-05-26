const store = require("../../../store/db");
// const store = require("../../../store/remote-db");
const controller = require("./controller");
const cache = require("../../../store/remote-cache");

module.exports = controller(store, cache);