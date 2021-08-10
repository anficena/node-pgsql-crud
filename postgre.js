const { Sequelize } = require('sequelize');
const { Connection } = require('pg');
const sequelize = new Sequelize('dvdrental', 'postgres', 'anficena19', {
    host: 'localhost',
    dialect: 'postgres'
});

const run = {
    async connect () {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },

    food : () => {
        console.log("hello");
    }
}

run.food();