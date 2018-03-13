const db = require('../models');

const {
    Site,
    Laptop,
    Producer,
} = db;

const setSitesNameInDB = async () => {
    await Promise.all(
        [
            Site.create({
                id: 1,
                name: 'Technomarket',
            }),
            Site.create({
                id: 2,
                name: 'Techmart',
            }),
        ]);
};

const saveProducer = async (name) => {
    await Producer.create({
        name: name,
    });
};

const saveLaptop = async (laptop) => {
    await Laptop.create({
        model: laptop.model,
        display: laptop.display,
        price: laptop.price,
        ProducerId: laptop.ProducerId,
        SiteId: laptop.SiteId,
    });
};

module.exports = {
    setSitesNameInDB,
    saveProducer,
    saveLaptop,
};
