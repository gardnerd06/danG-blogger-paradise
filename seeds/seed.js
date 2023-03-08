const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const users = require('./users.json');
const blogPosts = require('./blogPosts.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(users, {
        individualHooks: true,
        returning: true,
    });
    await Blog.bulkCreate(blogPosts, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();

