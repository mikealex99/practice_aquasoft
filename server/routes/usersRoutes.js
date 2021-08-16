const express = require('express')
const router = express.Router()
const ctrlAuth = require('../controllers/authCtrl')
const auth=require('../middleware/auth')

router.post('/register', ctrlAuth.register)

router.post('/login', ctrlAuth.login)

router.get('/logout', ctrlAuth.logout)

router.get('/refresh_token', ctrlAuth.refreshToken)

router.get('/infor', ctrlAuth.getUser)


module.exports = router