const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "a2rp: an Ashish Ranjan presentation",
    });
});

module.exports = router;



