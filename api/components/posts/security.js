const jwt = require("../../../auth/index");
const response = require("../../../network/response")

const access = (req, res, next) => {
    try {
        req.user = jwt.verify(req);
        next();
    } catch (error) {
        response.error(req, res, "Acceso denegado", 400);
    }

}

module.exports = {
    access
}