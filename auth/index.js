const jwt = require("jsonwebtoken");

const sign = (data) => {
    const token = jwt.sign(data, "secret");
    return token;
}

const verify = (req) => {
    let token = req.headers.authorization;
    if (token.indexOf("Bearer ") != -1){
        token = token.replace("Bearer ", "");
        const decoded = jwt.verify(token, "secret");
        return decoded;
    }
    console.log("No hay barer");
}

module.exports = {
    sign,
    verify
}