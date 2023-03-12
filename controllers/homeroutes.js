const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            posts,
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
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});



router.get('/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.findByPk(req.params.id, { include: User });

        const blogPosts = dbBlogData.get({ plain: true });
        res.render('blogDetails', { blogPosts });
        // res.send(dbBlogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

module.exports = router;


// withAuth, 