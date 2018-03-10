const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const {
    saveLaptop,
    checkAndSaveProducer,
} = require('./save');

const parseSingleTechnomarket = async (link) => {
    const dom = await JSDOM.fromURL(link);
    const $ = $init(dom.window);

    const producerAndModel = $('.product-heading h1 a span').html().split(' ');

    const producerId = await checkAndSaveProducer(producerAndModel[1]);
    const model = producerAndModel.slice(2).join(' ');

    const price = parseFloat($('span.new').html());

    let display = 0;

    [...$('.product-description li')].map((el) => {
        const text = $(el).html();

        if (text.includes('DISPLAY') && !text.includes('PORT')) {
            const textAsArr = text.split(' ');
            display = textAsArr[1];
            display = parseFloat(display.replace(',', '.'));
        }
    });

    await saveLaptop({
        model: model,
        display: display,
        price: price,
        ProducerId: producerId,
        SiteId: 1,
    });
};

const parseElementsTechnomarket = (list) => {
    list.forEach((link) => {
        parseSingleTechnomarket(link);
    });
};

module.exports = {
    parseElementsTechnomarket,
};
