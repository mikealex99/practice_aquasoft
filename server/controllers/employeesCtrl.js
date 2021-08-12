const {Employees} = require ('../models')
const {Projects} = require ('../models')

const employeesCtrl = {

    // adauga un nou angajat
    addEmployee: async(req, res) => {
        try {
            const add = req.body;

            // salvare in MySQL
            await Employees.create(add)

            // postman verify
            res.json(add)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },

    // listeaza toti angajatii
    getEmployees: async (req, res) => {
        try {
            //display all records
            const listEmployees = await Employees.findAll()
            res.json(listEmployees)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // listeaza un singur angajat in functie de nume
    getEmployeeByName: async(req, res) => {
        try {
            const nam = req.params.name

            // find employee by name
            const emplName = await Employees.findAll({ where: { name: `${nam}`} });

            res.json(emplName)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

       // listeaza un singur angajat in functie de id
       getEmployeeById: async(req, res) => {
        try {
            const nam = req.params.id

            // find employee by id
            const emplName = await Employees.findAll({ where: { id: nam} });

            res.json(emplName)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // sterge un angajat in functie de pk
    deleteEmployee: async (req, res) =>{
        try {
            const emplID = req.params.id

            await Employees.destroy({
                where: {
                    id: emplID
                }
            })

            res.json('Ati eliminat un angajat cu succes!')

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // modifica un angajat in functie de pk
    updateEmployee: async (req, res) => {
        const emplID = req.params.id
        
        await Employees.update(req.body, {
            where: {
                id: emplID
            }
        })

        res.json('Ati actualizat un angajat cu succes!')

    },

    // join 'Employees' / 'Projects' 
    getEmployeeandProject: async(req, res) => {
        try {
            const id = req.params.id

            // afisarea unui angajat si a proiectului specific acestuia
            const list = await Employees.findOne({
                where: { 
                    id: id
                },
                include: {
                    model: Projects 
                }
            })

            res.json(list);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

        // join 'Employees' / 'Projects' 
        getEmployeeProjects: async(req, res) => {
            try {
    
                // afisarea unui angajat si a proiectului specific acestuia
                const list = await Employees.findAll({
                    include: {
                        model: Projects 
                    }
                })
                res.json(list);
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        }
    
}

module.exports = employeesCtrl