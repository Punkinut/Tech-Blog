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
            order: [['id', 'DESC']],
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
        order: [['id', 'DESC']],
    });
   
    const currentPosts = userPosts.map((post) => post.get({ plain: true}));
    let postStatus;
    if (currentPosts[0] === undefined) {
        postStatus = false
    } else {
        postStatus = true
    }

    try {
        res.render('dashboard', {
            postStatus,
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

router.get('/dashboard/new', redirect, async (req, res) => {
    try {
        res.render('new', {
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/dashboard/view/:id', redirect, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const viewPost = postData.get({ plain: true });
  
      res.render('editPost', {
        ...viewPost,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

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