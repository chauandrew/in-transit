const express = require('express');
const router = express.Router();
const postService = require('../../services/PostService')

router.get('/', (req, res) => {
    postService.getPosts(req.query.q)
        .then((rows) => {
            res.send(rows)
        })
        .catch((err) => {
            res.status(400)
            res.send(err)
        })
})

module.exports = router;