const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
// const withAuth = require('../utils/auth');



router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const projectData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // // Serialize data so the template can read it
        const projects = projectData.map((project) => project.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.send(projects);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/blog', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json(newBlog);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/comment', async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);

        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json(newComment);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});












module.exports = router;