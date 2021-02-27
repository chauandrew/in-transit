const express = require('express');
const router = express.Router();
const gsheetService = require('../../services/GsheetService')

router.get('/', (_, res) => {
    gsheetService.getRows("Posts")
        .then((rows) => {
        res.send(rows)
    })
        .catch((err) => {
            res.status(400)
            res.send(err)
        })

})

module.exports = router;