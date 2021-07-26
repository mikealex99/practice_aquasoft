const express = require('express')
const router = express.Router()
const projectsCtrl = require('../controllers/projectsCtrl')

//ruta catre afisarea proiectelor
router.get('/list', projectsCtrl.getProjects)

//ruta catre adaugarea proiectelor
router.post('/add', projectsCtrl.addProject)

// ruta catre afisarea angajatilor in functie de id
router.get('/listById/:id', projectsCtrl.getProjectById)

//ruta catre stergerea unui proiect in functie de id
router.delete('/remove/:id', projectsCtrl.deleteProject)

//ruta catre modificarea unui proiect in functie de id
router.put('/edit/:id', projectsCtrl.updateProject)

module.exports = router