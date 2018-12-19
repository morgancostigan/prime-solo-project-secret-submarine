const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    let queryText = (`SELECT * FROM "secret" 
        WHERE ($1) > "secret"."secrecy_level";`);
    pool.query(queryText, [req.user.clearance_level]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;

