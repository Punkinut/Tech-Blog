const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/post', async (req, res) => {
    try {
        const newPost = await Post.create({
            name: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        })
        res.status(200).json(newPost)
  
    } catch (error) {
      res.status(400).json({ error: error.toString() });
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    try {

      const commentDelete = await Comment.destroy({
        where: {
          post_id: req.params.id,
        }
      })

      const postDelete = await Post.destroy({
          where: {
              id: req.params.id,
              user_id: req.session.user_id

          }
      })
  
      res.status(200).json(postDelete)
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/update/:id', async (req, res) => {
    try {
      const postUpdate = await Post.update(
        {
          name: req.body.title,
          description: req.body.description,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id
          },
        }
      )
  
      res.status(200).json(postUpdate)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;