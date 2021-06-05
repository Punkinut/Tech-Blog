const router = require('express').Router();
const { Post } = require('../../models');

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

  router.delete('/:id', async (req, res) => {
    try {
      const postDelete = await Post.destroy({
          where: {
              id: req.params.id
          }
      })
  
      res.status(200).json(postDelete)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;