const express = require("express");
const router = express.Router();

const postRoutes = require("./routes/PostRoutes");

router.use("/api/v1/post", postRoutes);

module.exports = router;
