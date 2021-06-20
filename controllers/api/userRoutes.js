const router = require('express').Router();
const { User, Post } = require('../../models');
const number = require('../../utils/randomNumber');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      picture: `/Images/avatars/${number}.svg`
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const pictureUpdate = await User.update(
      {
        picture: req.body.picture,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )

    res.status(200).json(pictureUpdate)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/update/profile/:id', async (req, res) => {
  try {
    const profileUpdate = await User.update(
      {
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )

    res.status(200).json(profileUpdate)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      if (!userData) {
        res.status(400).json({});
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({});
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (error) {
      res.status(400).json({ error: error.toString() });
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;