const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

router.get('/', UserController.Load_List);
router.post('/Login', UserController.Login);
router.post('/Register', UserController.Register);
router.put('/', UserController.Update);
router.delete('/:id', UserController.Delete);
router.post('/Load_By_Id', UserController.Load_By_Id);

module.exports = router;

