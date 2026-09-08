const path = require("path");
const express = require("express");
const cors = require("cors");

const routes = require("./v1/routes");

const app = express();
const frontendBuildPath = path.resolve(__dirname, "../../aws-app1-frontend/build");
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
    : "*";

app.disable("x-powered-by");
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.get("/health", (req, res) => {
    res.status(200).json({ success: true, status: "ok" });
});

app.use("/api/v1", routes);

app.use("/api", (req, res) => {
    res.status(404).json({ success: false, message: "API endpoint not found" });
});

app.use(express.static(frontendBuildPath));
app.get(/.*/, (req, res, next) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"), (error) => {
        if (!error) return;
        if (error.code === "ENOENT") {
            return res.status(503).json({
                success: false,
                message: "Frontend build is unavailable",
            });
        }
        return next(error);
    });
});

app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);

    console.error(error);
    const status = error.status || error.statusCode || 500;
    return res.status(status).json({
        success: false,
        message: status === 500 ? "Internal server error" : error.message,
    });
});

module.exports = app;
