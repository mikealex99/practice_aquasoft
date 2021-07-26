const express = require('express')
const router = express.Router()
const employeesCtrl = require('../controllers/employeesCtrl')

// ruta catre afisarea angajatilor
router.get('/list', employeesCtrl.getEmployees)

// ruta catre afisarea angajatilor in functie de nume
router.get('/listByName/:name', employeesCtrl.getEmployeeByName)

// ruta catre afisarea angajatilor in functie de id
router.get('/listById/:id', employeesCtrl.getEmployeeById)

// ruta catre afisarea angajatului impreuna cu proiectul sau
router.get('/listEmployeeProject/:id', employeesCtrl.getEmployeeandProject)

// ruta catre adaugarea angajatilor
router.post('/add', employeesCtrl.addEmployee)

// ruta catre stergerea unui angajat in functie de id
router.delete('/remove/:id', employeesCtrl.deleteEmployee)

// ruta catre modificarea unui angajat in functie de id
router.put('/edit/:id', employeesCtrl.updateEmployee)



module.exports = router