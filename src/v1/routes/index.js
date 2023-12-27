const express = require("express");
const router = express.Router();

const a2rpController = require("../controllers/a2rp.controller");
router.use("/a2rp", a2rpController);

module.exports = router;

