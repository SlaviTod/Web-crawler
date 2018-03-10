const cTable = require('console.table');

const visualize = (collection) => {
    const result = [];

    collection.forEach((el) => {
        result.push({
            model: el.get().model,
            price: el.get().price,
            display: el.get().display,
            producer: el.get().ProducerId,
            siteId: el.get().SiteId,
        });
    });
    console.table(result);
};

module.exports = {
    visualize,
};
