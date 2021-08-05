const express = require('express')
const router = express.Router()
const employeesCtrl = require('../controllers/employeesCtrl')
const auth = require('../middleware/auth')

// ruta catre afisarea angajatilor
router.get('/list', auth,  employeesCtrl.getEmployees)

// ruta catre afisarea angajatilor in functie de nume
router.get('/listByName/:name', auth, employeesCtrl.getEmployeeByName)

// ruta catre afisarea angajatilor in functie de id
router.get('/listById/:id', auth, employeesCtrl.getEmployeeById)

// ruta catre afisarea angajatului impreuna cu proiectul sau
router.get('/listEmployeeProject/:id', auth, employeesCtrl.getEmployeeandProject)

// ruta catre adaugarea angajatilor
router.post('/add', auth, employeesCtrl.addEmployee)

// ruta catre stergerea unui angajat in functie de id
router.delete('/remove/:id', auth, employeesCtrl.deleteEmployee)

// ruta catre modificarea unui angajat in functie de id
router.put('/edit/:id', auth, employeesCtrl.updateEmployee)



module.exports = router