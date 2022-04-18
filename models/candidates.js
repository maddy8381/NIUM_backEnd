const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Candidate = sequelize.define('candidates', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    jobTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    jobCompany: {
        type: Sequelize.STRING,
        allowNull: false
    },
    jobDescription: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Candidate;