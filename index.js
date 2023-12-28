const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./src/v1/routes");
const path = require("path");


app.use(cors({ "origin": "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

const ___dirname = path.dirname("");
app.use(express.static("../aws-app1-frontend/build"));
app.use(express.static(path.join(___dirname, "../aws-app1-frontend/build")));
app.get("*", async (req, res) => {
    res.sendFile(path.join(___dirname, "../aws-app1-frontend/build/index.html"));
});

const PORT = process.env.PORT || 1198;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}: http://127.0.0.1:${PORT}`);
});

