const express = require("express");
const network = require("./network");
const app = express();

//Midlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use("/", network);

app.listen(3002, () => {
    console.log("Redis on port 3002");
})