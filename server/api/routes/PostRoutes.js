const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
    res.send("Response from /api/v1/post");
})

module.exports = router;