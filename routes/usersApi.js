var express = require('express');
var router = express.Router();
var db = require('./queries');

router.post('/users', db.signIn)
router.post('/users/new', db.createUser)
router.get('/users/animations', db.getAllPreBuiltAnimations)
router.get('/users/:user_id/animations', db.getAllMyAnimations)
router.post('/users/:user_id/animations/new', db.addAnimation)
router.put('/users/:user_id/animations/:animation_id', db.editAnimation)
router.delete('/users/:user_id/animations/:animation_id', db.deleteAnimation)

module.exports = router;
