const {
    clearDataBase,
} = require('./functionality/clearDataBase');
const {
    updateDataBase,
} = require('./functionality/updateDataBase');

const update = async ()=> {
    await clearDataBase();

    await updateDataBase();
};

update();
