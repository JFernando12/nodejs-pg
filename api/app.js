const express = require("express");
const morgan = require("morgan");
const users = require("./components/users/network");
const auth = require("./components/auth/network");
const post = require("./components/posts/network");

const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/posts", post);

app.listen(app.get("port"), () => {
    console.log("Server on port: ", app.get("port"))
})