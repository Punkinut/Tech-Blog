const router = require('express').Router();
const { User, Post, Comment, Hearts} = require('../models');
const withAuth = require('../utils/auth');
const redirect= require('../utils/redirect');
const home = require('../utils/home');
let pageVisit;

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

        let homeStatus;
        if (posts[0] === undefined) {
            homeStatus = false
        } else {
            homeStatus = true
        }

        if (req.session.logged_in) {
            const hearts = await Hearts.findAll({
                where: {
                    user_id: req.session.user_id
                }
            })
    
            const haveHearted = hearts.map((heart) => heart.get({ plain: true}))
            console.log(haveHearted)
            console.log(posts)
            // Gotta figure out how to have heart display on one post
            let allowHeart;
            if (haveHearted.length == 0){
                allowHeart = true
            }
            else{
                allowHeart = false
            }
            res.render('home', {
                homeStatus,
                allowHeart,
                posts,
                logged_in: req.session.logged_in,
                user_id: req.session.user_id
            });
        } else {
            let allowHeart = true;
            res.render('home', {
                homeStatus,
                allowHeart,
                posts,
                logged_in: req.session.logged_in,
                user_id: req.session.user_id
            });
        }


        
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/profile/:id', redirect, async (req, res) => {
    try {

        pageVisit = true;
        const userDetails = await User.findByPk(req.params.id)
        const postInfo = await Post.findAll({
            where: {
                user_id: req.params.id
            },
            order: [['id', 'DESC']],
        });
        const postFeed = postInfo.map((posty) => posty.get({ plain: true}));
        const userPage = userDetails.get({ plain: true });
        let showCase
        if (userPage.description === null) {
            showCase = true
        } else {
            showCase = false
        }

        // Checks if the paramter matches the user
        let profileCheck;
        if (req.params.id == req.session.user_id) {
            profileCheck = true;
        } else {
            profileCheck = false;
        }

        res.render('profile', {
            logged_in: req.session.logged_in,
            ...userPage,
            postFeed,
            showCase,
            user_id: req.session.user_id,
            profileCheck
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
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/changeicon', redirect, async (req, res) => {
    try {
        res.render('changeIcon', {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/addicon', redirect, async (req, res) => {
    try {
        if (pageVisit === true) {
            res.redirect('/changeicon');
          } else {
            res.render('addIcon', {
                logged_in: req.session.logged_in,
                user_id: req.session.user_id
            });
          }
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
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/profile/edit/:id', redirect, async (req, res) => {
    try {
        const profileData = await User.findByPk(req.params.id);
        const editProfileData = profileData.get({ plain: true });

        if (req.params.id != req.session.user_id) {
            res.redirect('/');
          } else {
            res.render('editProfile', {
                ...editProfileData,
                logged_in: req.session.logged_in,
                user_id: req.session.user_id
            })
          }
        
    } catch (err) {
        res.status(500).json(err)
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
      if (viewPost.user_id !== req.session.user_id) {
        res.redirect('/');
      } else {
        res.render('editPost', {
            ...viewPost,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
          });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/page/comment/:id', redirect, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name', 'picture'],
          },
        ],
      });

      const commentData = await Comment.findAll({
          where: {
              post_id: req.params.id
          },
          include: [
            {
                model: User,
                attributes: ['name', 'picture'],
            },
        ],
          order: [['id', 'DESC']],
      });

      const currentComments = commentData.map((comment) => comment.get({ plain: true}));

      const viewPost = postData.get({ plain: true });
      res.render('commentPage', {
          currentComments,
          viewPost,
          logged_in: req.session.logged_in,
          user_id: req.session.user_id
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