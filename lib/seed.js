// In case we need to seed the database with any question in future they go here


const {Category} = require('../lib/models');

const seedTheDatabase = async () => {
    let categories = await Category.findAll({});

    if(categories.length == 0){
        await Category.create({name: 'Category One'});
        await Category.create({name: 'Category Two'});
        await Category.create({name: 'Category Three'});
        await Category.create({name: 'Category Four'});
        await Category.create({name: 'Category Five'});
    }

};

seedTheDatabase()
