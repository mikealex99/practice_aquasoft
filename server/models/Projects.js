module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define("Projects", {
        project_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        planned_end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        project_code: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Projects
}