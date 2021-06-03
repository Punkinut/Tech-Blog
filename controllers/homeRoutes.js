const router = require('express').Router();
const { User, Post} = require('../models');
const withAuth = require('../utils/auth');
const home = require('../utils/home');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true}));
        res.render('home', {
            posts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard', {
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', home, async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;