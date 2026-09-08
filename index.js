const app = require("./src/app");

const DEFAULT_PORT = 1198;
const configuredPort = Number.parseInt(process.env.PORT, 10);
const port = Number.isInteger(configuredPort) && configuredPort > 0 && configuredPort <= 65535
    ? configuredPort
    : DEFAULT_PORT;

const server = app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});

function shutdown(signal) {
    console.log(`${signal} received. Shutting down gracefully.`);
    server.close(() => process.exit(0));
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

module.exports = server;

