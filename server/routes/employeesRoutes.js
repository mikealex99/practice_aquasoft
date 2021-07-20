const express = require('express')
const router = express.Router()
const employeesCtrl = require('../controllers/employeesCtrl')

//ruta catre afisarea angajatilor
router.get('/display', employeesCtrl.getEmployees)

//ruta catre afisarea angajatilor in functie de nume
router.get('/displayByName/:name', employeesCtrl.getEmployeeByName)

//ruta catre adaugarea angajatilor
router.post('/add', employeesCtrl.addEmployee)

//ruta catre stergerea unui angajat in functie de id
router.delete('/remove/:id', employeesCtrl.deleteEmployee)

//ruta catre modificarea unui angajat in functie de id
router.put('/editEmployee/:id', employeesCtrl.updateEmployee)

module.exports = router