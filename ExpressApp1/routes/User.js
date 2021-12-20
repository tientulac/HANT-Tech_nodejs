const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

router.get('/', userController.Load_List);
router.post('/Login',userController.Login);
router.post('/Register', userController.Register);
router.put('/:id', userController.Update);
router.delete('/:id', userController.Delete);
module.exports = router;

