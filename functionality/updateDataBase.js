const {
    getUrlsTechmart,
    getUrlsTechnomarket,
} = require('./getUrls');

const {
    parseElementsTechnomarket,
} = require('./technomarket-parser');

const {
    parseElementsTechmart,
} = require('./techmart-parser');

const {
    setSitesNameInDB,
} = require('./save');

const updateDataFromSites = async (siteId) => {
    const url1 = 'https://www.technomarket.bg/laptopi';
    const url2 = 'https://techmart.bg/product/product/index/lang/1/category/567/limit/48/paging/';

    const links1 = await getUrlsTechnomarket(url1);
    const links2 = await getUrlsTechmart(url2);

    await Promise.all([
        parseElementsTechnomarket(links1),
        parseElementsTechmart(links2),
    ]);
};

const updateDataBase = async () => {
    await Promise.all([
        setSitesNameInDB(),
        updateDataFromSites(),
    ]);
};

module.exports = {
    updateDataBase,
};
