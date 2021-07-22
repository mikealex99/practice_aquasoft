const {Projects} = require("../models");

const projectsCtrl = {
      // adauga un nou proiect
      addProject: async(req, res) => {
        try {
            const add = req.body;

            // salvare in MySQL
            await Projects.create(add)

            // post verify
            res.json(add)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },

    // listeaza toate proiectele
    getProjects: async (req, res) => {
        try {
            //display all records
            const listProjects = await Projects.findAll()
            res.json(listProjects)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

     // sterge un proiect in functie de pk
     deleteProject: async (req, res) =>{
        try {
            const projID = req.params.id

            await Projects.destroy({
                where: {
                    id: projID
                }
            })

            res.json('Ati eliminat cu succes un proiect!')

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // modifica un proiect in functie de pk
    updateProject: async (req, res) => {
        const projID = req.params.id
        
        await Projects.update(req.body, {
            where: {
                id: projID
            }
        })

        res.json('Ati actualizat cu succes un proiect!')

    }
}

module.exports = projectsCtrl