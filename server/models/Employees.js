module.exports = (sequelize, DataTypes) => {

    const Employees = sequelize.define("Employees", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hire_date:{
            type: DataTypes.DATE,
            allowNull:false
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        job_title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Employees
}