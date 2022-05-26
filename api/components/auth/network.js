const { Router } = require("express");
const router = Router();
const controller = require("./index");
const response = require("../../../network/response");

router.get("/login", async(req, res) => {
    try {
        const result = await controller.login(req.body);
        response.success(req, res, "Login correcto", result, 200);
    } catch (error) {
        console.log(error);
        response.error(req, res, "Algo salió mal", 500);
    }
})

module.exports = router;