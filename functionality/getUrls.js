/* global Set */
const {
    JSDOM,
} = require('jsdom');

const _ = require('lodash');

const $init = require('jquery');

const getPagesUrlsTechmart = async (url) => {
    const dom = await JSDOM.fromURL(url);

    const $ = $init(dom.window);
    const pagesLinks = new Set();

    [...$('.pagination.nomargin.pagesbox a')].map((link) => {
        const href = $(link).attr('href');
        if (typeof href !== 'undefined') {
            pagesLinks.add(href);
        }
    });

    return [url, ...pagesLinks];
};

const getUrlsTechmart = async (url) => {
    const pageUrls = await getPagesUrlsTechmart(url);

    const links = (await Promise.all(
            pageUrls.map((pageUrl) => JSDOM.fromURL(pageUrl))))
        .map((dom) => $init(dom.window))
        .map(($) => [...$('.itemsHolder .itemsPicsHolder a')]
            .map((link) => $(link)
                .attr('href')));

    return _.chain(links)
        .flatten()
        .sortedUniq()
        .value();
};

const getUrlsTechnomarket = async (url) => {
    const dom = await JSDOM.fromURL(url);

    const $ = $init(dom.window);
    const laptopsLinks = [...$('.product a.product-thumb')]
        .map((link) => 'https://www.technomarket.bg' + $(link).attr('href'));

    return _.chain(laptopsLinks)
    .flatten()
    .sortedUniq()
    .value();
};

module.exports = {
    getUrlsTechmart,
    getUrlsTechnomarket,
};
