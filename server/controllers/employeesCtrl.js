const {Employees} = require ('../models')

const employeesCtrl = {
    // adauga un nou angajat
    addEmployee: async(req, res) => {
        try {
            const add = req.body;

            // salvare in MySQL
            await Employees.create(add)

            // post verify
            res.json(add)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },

    //listeaza toti angajatii
    getEmployees: async (req, res) => {
        try {
            //display all records
            const listEmployees = await Employees.findAll()
            res.json(listEmployees)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = employeesCtrl