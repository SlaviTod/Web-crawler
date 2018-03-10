const db = require('../models');

const {
    Producer,
    Laptop,
    Site,
} = db;

const Op = db.Sequelize.Op;

const orderBy = (col, desc) => {
    if (desc && desc.toLowerCase() === 'desc') {
        return Laptop.findAll({
            order: [
                [col, 'DESC'],
            ],
        });
    }
        return Laptop.findAll({
        order: [col],
    });
};


const filterBy = async (col, operator, parameter) => {
    switch (operator) {
        case 'gt':
            return await Laptop.findAll({
                where: {
                    [col]: {
                        [Op.gt]: parseFloat(parameter),
                    },
                },
            });
        case 'gte':
            return await Laptop.findAll({
                where: {
                    [col]: {
                        [Op.gte]: parseFloat(parameter),
                    },
                },
            });
        case 'ne':
            return await Laptop.findAll({
                where: {
                    [col]: {
                        [Op.ne]: parseFloat(parameter),
                    },
                },
            });
        case 'lt':
            return await Laptop.findAll({
                where: {
                    [col]: {
                        [Op.lt]: parseFloat(parameter),
                    },
                },
            });
        case 'lte':
            return await Laptop.findAll({
                where: {
                    [col]: {
                        [Op.lte]: parseFloat(parameter),
                    },
                },
            });
        default:
            console.log(`The operator ${operator} is not defined yet.`);
    }
    return null;
};

const searchBy = async (table, name) => {
    if (table.toLowerCase() === 'site') {
        const id = (await Site.findOne({
            attributes: ['id'],
            where: {
                name: name,
            },
        })).dataValues.id;

        return await Laptop.findAll({
            where: {
                SiteId: id,
            },
        });
    } else if (table.toLowerCase() === 'producer') {
        const id = (await Producer.findOne({
            attributes: ['id'],
            where: {
                name: name,
            },
        })).dataValues.id;

        return await Laptop.findAll({
            where: {
                ProducerId: id,
            },
        });
    }
    return null;
};

module.exports = {
    orderBy,
    filterBy,
    searchBy,
};
