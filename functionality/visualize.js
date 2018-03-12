const cTable = require('console.table');

const visualize = (collection) => {
    const result = [];

    collection.forEach((el) => {
        result.push({
            model: el.model,
            price: el.price,
            display: el.display,
            producer: el.Producer.name,
            site: el.Site.name,
        });
    });
    console.table(result);
};

module.exports = {
    visualize,
};
