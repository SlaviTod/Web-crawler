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

const checkAndSaveProducer = async (name) => {
    let producer = await Producer.findOne({
        where: {
                name: name,
            },
    });

    if (producer === null) {
        await saveProducer(name);
        producer = await Producer.findOne({
            where: {
                    name: name,
                },
        });
    }

    return producer.id;
};

module.exports = {
    setSitesNameInDB,
    saveLaptop,
    checkAndSaveProducer,
};
