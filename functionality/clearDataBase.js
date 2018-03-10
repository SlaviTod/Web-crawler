const db = require('../models');
const {
    Laptop,
    Producer,
    Site,
} = db;

const clearDataBase = async () => {
    await Promise.all([
        Laptop.destroy({ where: {} }),
        Producer.destroy({ where: {} }),
        Site.destroy({ where: {} }),
    ]);
};

module.exports = {
    clearDataBase,
};
