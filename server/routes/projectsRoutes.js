const express = require('express')
const router = express.Router()
const projectsCtrl = require('../controllers/projectsCtrl')
const auth = require('../middleware/auth')

//ruta catre afisarea proiectelor
router.get('/list', auth,  projectsCtrl.getProjects)

//ruta catre adaugarea proiectelor
router.post('/add', auth, projectsCtrl.addProject)

// ruta catre afisarea angajatilor in functie de id
router.get('/listById/:id',auth, projectsCtrl.getProjectById)

//ruta catre stergerea unui proiect in functie de id
router.delete('/remove/:id',auth, projectsCtrl.deleteProject)

//ruta catre modificarea unui proiect in functie de id
router.put('/edit/:id', auth, projectsCtrl.updateProject)

module.exports = router