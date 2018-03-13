const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const parseSingleTechmart = async (link) => {
    const dom = await JSDOM.fromURL(link);
    const $ = $init(dom.window);

    const producerAndModel = $('h1.productTitle strong').html().split(' ');
    
    const model = producerAndModel.slice(2).join(' ');

    const price = parseFloat($('h2.textPosition span').first().html());

    let display = 0;
    [...$('.underlineChatacteristics p')].map((el) => {
        const text = $(el).html();

        if (text.includes('екрана')) {
            const regex = /\d{1,2}([\.\,]\d)?\s?["]/;
            display = text.match(regex);
            display = parseFloat(display[0].replace(',', '.'));
        }
    });

    return {
        model: model,
        display: display,
        price: price,
        producer: producerAndModel[1],
        SiteId: 2,
    };
};

module.exports = {
    parseSingleTechmart,
};
