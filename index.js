const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./src/v1/routes");
const path = require("path");


app.use(cors({ "origin": "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "../aws-app1-frontend/build");
app.use(express.static(buildpath));

const PORT = process.env.PORT || 1198;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}: http://127.0.0.1:${PORT}`);
});

