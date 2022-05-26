const express = require("express");
const app = express();
const network = require("./network");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.use("/", network);

app.listen(5000, () => {
    console.log("DB on port 5000");
})