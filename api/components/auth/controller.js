const bcrypt = require("bcrypt");
const jwt = require("../../../auth/index");
const table = "auth";

const controller = (store) => {
    const register = async(data) => {
        data.password = await bcrypt.hash(data.password, 5);
        store.add(table, data);
    }

    const login = async(data) => {
        let Token;
        const user = await store.getOne(table, data);
        if (user) {
            const passwordCorrect = await bcrypt.compare(data.password, user.password)
            if (passwordCorrect) {
                Token = jwt.sign(user);
                return Token
            }
            else {
                throw new Error ("Datos incorrectos");
            }
        }
        else {
            throw new Error ("Datos incorrectos");
        }
    }

    return({
        register,
        login
    })
}

module.exports = controller;