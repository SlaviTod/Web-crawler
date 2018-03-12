/* global process */
const {
    orderBy,
    filterBy,
    searchBy,
} = require('./functionality/getStatistics');

const {
    visualize,
} = require('./functionality/visualize');

const run = async () => {
    let result;

    const args = process.argv[2].split(/:|-/);
    switch (args[0]) {
        case 'order':
            result = await orderBy(args[2], args[3]);
            break;
        case 'filter':
            result = await filterBy(args[1], args[2], args[3]);
            break;
        case 'search':
            result = await searchBy(args[1], args[2]);
            break;
        default:
            result = ['some error occure. Chack run command'];
            console.log('Check');
    }
    if (result) {
        visualize(result);
    }
};

run();
