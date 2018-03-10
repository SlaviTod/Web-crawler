const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const {
    saveLaptop,
    checkAndSaveProducer,
} = require('./save');

const parseSingleTechmart = async (link) => {
    const dom = await JSDOM.fromURL(link);
    const $ = $init(dom.window);

    const producerAndModel = $('h1.productTitle strong').html().split(' ');
    const producerId = await checkAndSaveProducer(producerAndModel[1]);

    const model = producerAndModel.slice(2).join(' ');
    const price = parseFloat($('h2.textPosition b span').first().html());

    let display = 0;
    [...$('.underlineChatacteristics p')].map((el) => {
        const text = $(el).html();

        if (text.includes('екрана')) {
            const textAsArr = text.split(':');
            display = textAsArr[1].trim().split('(')[0].trim();
            display = parseFloat(display.substring(0, display.length - 1));
        }
    });

    await saveLaptop({
        model: model,
        display: display,
        price: price,
        ProducerId: producerId,
        SiteId: 2,
    });
};

const parseElementsTechmart = (list) => {
    list.forEach((link) => {
        parseSingleTechmart(link);
    });
};

module.exports = {
    parseElementsTechmart,
};
