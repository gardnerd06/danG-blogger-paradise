const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./comment');

User.hasOne(Blog, {
    foreignKey: 'user_id',
    constraints: false,
    onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    constraints: false,
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    constraints: false,
    onDelete: 'CASCADE',
});


Comment.belongsTo(User, {
    foreignKey: 'user_id',
    constraints: false,
});



module.exports = { User, Blog, Comment };
