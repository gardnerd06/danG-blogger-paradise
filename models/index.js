const User = require('./User');
const Blog = require('./Blog');

User.hasOne(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});


Blog.belongsTo(User, {
    foreignKey: 'user_id',
});



module.exports = { User, Blog };
