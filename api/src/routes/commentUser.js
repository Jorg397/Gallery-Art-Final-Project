const express = require('express');
const router = require('express').Router();
const commentController = require('./controllers/commentUser');



router
.put('/:idComment', commentController.putUser)
.delete('/:idComment', commentController.delete);


module.exports = router;
