const User = require('./User');
const Blog = require('./Blog');

User.hasOne(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Blog };
