const {
    clearDataBase,
} = require('./functionality/clearDataBase');

const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const _ = require("lodash");

const {
    parseSingleTechmart,
} = require('./functionality/techmart-parser');

const {
    parseSingleTechnomarket,
} = require('./functionality/technomarket-parser');

const db = require('./models');
const {
    Producer,
} = db;

const {
    saveProducer,
    setSitesNameInDB,
    saveLaptop,
} = require('./functionality/save');

const {
    getUrlsTechmart,
    getUrlsTechnomarket,
} = require('./functionality/getUrls');

const laptops = [];

const parseUrls1 = async (arr) => {
    if (arr.length === 0) {
        return;
    }
    const url = arr.pop();
    laptops.push(await parseSingleTechnomarket(url));
    return await parseUrls1(arr);
}

const parseElementsTechnomarket = async (list) => {
    const threads = 32;
    const laptopsUrls = (await Promise.all(
        Array.from({
            length: threads
        }).map((_) => parseUrls1(list))));
};

const parseUrls2 = async (arr) => {
    if (arr.length === 0) {
        return;
    }
    const url = arr.pop();
    laptops.push(await parseSingleTechmart(url));
    return await parseUrls2(arr);
}

const parseElementsTechmart = async (list) => {
    const threads = 32;
    const laptopsUrls = (await Promise.all(
        Array.from({
            length: threads
        }).map((_) => parseUrls2(list))));
};

const updateData = async () => {
    const url1 = 'https://www.technomarket.bg/laptopi';
    const url2 = 'https://techmart.bg/product/product/index/lang/1/category/567/limit/48/paging/';

    const links1 = await getUrlsTechnomarket(url1);
    const links2 = await getUrlsTechmart(url2);

    await Promise.all(
        [parseElementsTechnomarket(links1),
            parseElementsTechmart(links2)
        ]
    );

};

const update = async () => {
    await clearDataBase();
    await setSitesNameInDB();
    await updateData();
    return laptops;
};


update().then(async (laptops) => {

    const producers = new Set();
    laptops.map((el) => {
        producers.add(el.producer);
    });

    await Promise.all(
    [...producers].map(async (el) => {
        await saveProducer(el);
    }));
    laptops.map(async (el)=> {
        await saveLaptop(el);
    });
});