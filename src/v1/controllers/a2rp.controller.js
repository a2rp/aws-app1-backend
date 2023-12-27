const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("a2rp: an Ashish Ranjan presentation");
    res.json({ success: true, message: "a2rp: an Ashish Ranjan presentation" });
});

module.exports = router;



