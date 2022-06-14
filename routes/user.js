const express = require('express');
const router = express.Router();

const {signup,signin,signout} = require('../controllers/user');

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);


module.exports = router;