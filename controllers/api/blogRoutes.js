const router = require('express').Router();
const { User, Blog } = require('../../models');
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












module.exports = router;