const jwt = require("../../../auth/index");
const response = require("../../../network/response")

const access = async(req, res, next) => {
    try {
        req.user = jwt.verify(req);
        if(req.user.id == req.params.id){
            next();
        }
        else{
            throw new Error("Acceso denegado");
        }
    } catch (error) {
        response.error(req, res, "Acceso denegado", 400);
    } 
}

const follow = async(req, res, next) => {
    try {
        req.user = jwt.verify(req);
        if(req.user) {
            next();
        }
        else{
            throw new Error("Inicia sesión");
        }
    } catch (error) {
        console.log(error);
        response.error(req, res, "Acceso denegado", 400);
    }
}

module.exports = {
    access,
    follow
}