const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const parseSingleTechnomarket = async (link, laptops, producers) => {
    const dom = await JSDOM.fromURL(link);
    const $ = $init(dom.window);

    const producerAndModel = $('.product-heading h1 a span').html().split(' ');

    const model = producerAndModel.slice(2).join(' ');

    const price = parseFloat($('span.new').html());

    let display = 0;

    [...$('.product-description li')].map((el) => {
        const text = $(el).html();

        if (text.includes('DISPLAY') && !text.includes('PORT')) {
            let regex = /(\d{1,2}[\.\,]\d?\s?)[",'',ИНЧА]/;
            display = text.match(regex);
            if (!display) {
                regex = /\d{1,2}[\.\,]?\d?/;
                display = text.match(regex);
            }
            display = parseFloat(display[0].replace(',', '.'));
        }
    });

    return {
        model: model,
        display: display,
        price: price,
        producer: producerAndModel[1],
        SiteId: 1,
    };
};

module.exports = {
    parseSingleTechnomarket,
};
