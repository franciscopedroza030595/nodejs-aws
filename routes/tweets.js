// Ruta: /api/tweets

const { Router } = require('express');

const { getTweets } = require('../controllers/twitter');

const router = Router();


router.get('/', getTweets);




module.exports = router;