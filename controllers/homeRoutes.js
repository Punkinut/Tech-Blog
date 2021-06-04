const router = require('express').Router();
const { User, Post} = require('../models');
const withAuth = require('../utils/auth');
const redirect= require('../utils/redirect');
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

router.get('/dashboard', redirect, async (req, res) => {

    const userPosts = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
    });
   
    const currentPosts = userPosts.map((post) => post.get({ plain: true}));
    console.log(currentPosts[0].name)

    try {
        res.render('dashboard', {
            currentPosts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/redirect', withAuth, async (req, res) => {
    try {
        res.render('redirect');
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

router.get('/signup', home, async (req, res) => {
    try {
        res.render('signup', {
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;