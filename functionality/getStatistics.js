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
            include: [
                Producer,
                Site,
             ],
        });
    }
    return Laptop.findAll({
        order: [col],
        include: [
            Producer,
            Site,
         ],
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
                include: [
                    Producer,
                    Site,
                 ],
            });
        case 'gte':
            return await Laptop.findAll({
                where: {
                    [col]: {
                        [Op.gte]: parseFloat(parameter),
                    },
                },
                include: [
                    Producer,
                    Site,
                 ],
            });
        case 'ne':
            return await Laptop.findAll({
                where: {
                    [col]: {
                        [Op.ne]: parseFloat(parameter),
                    },
                },
                include: [
                    Producer,
                    Site,
                 ],
            });
        case 'lt':
            return await Laptop.findAll({
                where: {
                    [col]: {
                        [Op.lt]: parseFloat(parameter),
                    },
                },
                include: [
                    Producer,
                    Site,
                 ],
            });
        case 'lte':
            return await Laptop.findAll({
                where: {
                    [col]: {
                        [Op.lte]: parseFloat(parameter),
                    },
                },
                include: [
                    Producer,
                    Site,
                 ],
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
            include: [
                Producer,
                Site,
             ],
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
            include: [
                Producer,
                Site,
             ],
        });
    }
    return null;
};

module.exports = {
    orderBy,
    filterBy,
    searchBy,
};
