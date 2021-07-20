const express = require('express')
const router = express.Router()
const employeesCtrl = require('../controllers/employeesCtrl')

//rute catre afisarea si adaugarea angajatilor
router.get('/display', employeesCtrl.getEmployees)
router.post('/add', employeesCtrl.addEmployee)

module.exports = router