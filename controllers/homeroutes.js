const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await User.findAll({

            include: [{ model: Blog }, { model: Comment }],
        });

        const posts = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            posts,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/choice', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('choice');
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});
router.get('/signup', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/profile', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('profile', {
        user_id: req.session.user_id,
        logged_in: req.session.logged_in,
    });
});
// 
router.get('/dashboard/:id', withAuth, async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
        return;
    }
    try {
        const postData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }, { model: Comment }]
        });

        const userPosts = postData.get({ plain: true });

        res.render('dashboard', {
            userPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.findByPk(req.params.id, { include: User });
        const blogPosts = dbBlogData.get({ plain: true });
        res.render('blogDetails', { blogPosts, logged_in: req.session.logged_in, });
        // res.send(dbBlogData);
    } catch (err) {
        console.log(err);

        res.status(500).json(err);
    }

});




module.exports = router;


// withAuth, 