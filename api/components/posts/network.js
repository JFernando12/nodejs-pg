const { Router } = require("express");
const router = Router();
const security = require("./security");
const response = require("../../../network/response");
const controller = require("./index");

router.get("/", async(req, res) => {
    try {
        const result = await controller.get();
        response.success(req, res, "Procesado correctamente", result, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, "Algo salió mal", 500);
    }
})

router.post("/", security.access, async(req, res) => {
    try {
        await controller.add(req.user.id, req.body.text);
        response.success(req, res, "Procesado correctamente", req.body.text, 201);
    } catch (error) {
        response.error(req, res, "Algo salión mal", 400);
    } 
})

module.exports = router;