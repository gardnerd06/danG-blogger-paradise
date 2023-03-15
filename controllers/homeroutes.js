const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({

            include: [{ model: User, }],
        });

        const posts = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
        // res.send(posts);
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
router.get('/dashboard', async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const postData = await User.findAll({
            // attributes: { exclude: ['password'] },
            include: [{ model: Blog }, { model: Comment }]
            // include: [{ model: User }]
        });

        // const userPosts = postData.get({ plain: true });

        // res.render('dashboard', {
        //     ...userPosts,
        //     logged_in: true
        // });
        res.send(postData);
    } catch (err) {
        res.status(500).json(err);
    }
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