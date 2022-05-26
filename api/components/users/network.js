const { Router } = require("express");
const router = Router();
const security = require("./security");
const response = require("../../../network/response")
const controller = require("./index");

router.get("/", async(req, res) => {
    try {
        const result = await controller.get();
        response.success(req, res, "Procesado correctamente", result, 200)
    } catch (error) {
        console.log(error)
        response.error(req, res, "Algo salió mal", 500)
    }
})

router.get("/follow", security.follow, async(req, res) => {
    const result = await controller.following(req.user.id);
    response.success(req, res, "Procesado correctamente", result, 200);
})

router.get("/:id", security.access, async(req, res) => {
    try {
        const result = await controller.getOne(req.params.id);
        response.success(req, res, "Procesado correctamente", result, 200);
    } catch (error) {
        console.log(error);
        response.error(req, res, "Algo salió mal", 400);
    }
    
})

router.post("/", async(req, res) => {
    try {
        await controller.add(req.body);
        response.success(req, res, "Procesado correctamente", req.body.username, 201);
    } catch (error) {
        console.log(error);
        response.error(req, res, "Algo está mal", 500)
    }
})

router.delete("/:id", async(req, res) => {
    try {
        await controller.remove(req.params.id);
        response.success(req, res, "Eliminado correctamente", req.params.id, 200);
    } catch (error) {
        console.log(error);
        response.error(req, res, "Algo está mal", 400);
    }
})

router.post("/follow/:id", security.follow, async(req, res) => {
    try {
        console.log(req.user.id)
        await controller.follow(req.user.id, req.params.id);
        response.success(req, res, "Seguido correctamente", req.params.id, 201);
    } catch (error) {
        console.log(error);
        response.error(req, res, "Algo está mal", 400);
    }
})



module.exports = router;