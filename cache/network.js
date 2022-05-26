const { Router } = require("express");
const router = Router();
const store = require("../store/redis");
const response = require("../network/response");

router.get("/:table", async(req, res) => {
    try {
        const result = await store.get(req.params.table);
        response.success(req, res, "Procesado correctamente", result, 200);
    } catch (error) {
        console.log(error);
        response.error(req, res, "Algo salió mal", 400);   
    }
})

router.post("/:table", async(req, res) => {
    try {
        await store.add(req.params.table, req.body);
        response.success(req, res, "Procesado correctamente", req.body, 201);
    } catch (error) {
        console.log(error);
        response.error(req, res, "Algo salió mal", 400);   
    }
})

module.exports = router;