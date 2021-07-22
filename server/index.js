const express = require('express')
const app = express()
const MySQL_DB = require('./models')
const emplRouter = require('./routes/employeesRoutes')
const projRouter = require('./routes/projectsRoutes')

app.use(express.json())

// RECEIVE ROUTES ---> https://localhost:9999/ROUTES
app.use("/employees", emplRouter)
app.use("/projects", projRouter)

//connect to sequelize on port 9999      ---- CREATE TABLE IF NOT EXISTS
MySQL_DB.sequelize.sync().then(() => {
    app.listen(9999, () => {
        console.log("Server is running on port 9999")
    })
})
