// Ruta: /api/profile

const { Router } = require('express');

const { readProfile, updateProfile } = require('../controllers/profile');

const router = Router();


router.get('/', readProfile);

router.put('/', updateProfile)


module.exports = router;