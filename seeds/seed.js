const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const users = require('./users.json');
const blogPosts = require('./blogPosts.json');
const blogComments = require('./blogComment.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(users, {
        individualHooks: true,
        returning: true,
    });
    await Blog.bulkCreate(blogPosts, {
        returning: true,
    });

    await Comment.bulkCreate(blogComments, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();

