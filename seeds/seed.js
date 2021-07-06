const sequelize = require('../config/connection');
const { User, Post, Comment, Hearts } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const heartsData = require('./heartsData.json');
const session = require('express-session');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // for (const post of postData) {
    //   await Post.create({
    //     ...post,
    //     user_id: users[Math.floor(Math.random() * users.length)].id,
    //   });
    // }

    const post = await Post.bulkCreate(postData, {
      individualHooks: true,
      returning: true,
    })

    const comments = await Comment.bulkCreate(commentData, {
      individualHooks: true,
      returning: true,
    })

    const hearts = await Hearts.bulkCreate(heartsData, {
      individualHooks: true,
      returning: true,
    })
  
    process.exit(0);
  };
  
  seedDatabase();