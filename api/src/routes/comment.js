const express = require('express');
const router = require('express').Router();
const commentController = require('./controllers/comment');



router.post('/', commentController.post)
.put('/:idComment', commentController.putAdmin)



module.exports = router;
