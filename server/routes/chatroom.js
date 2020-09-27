const chatroomRouter = require('express').Router();
const {
  models: { Chatroom, User, ChatMessage, Job },
} = require('../db');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

chatroomRouter.get('/chatroom/:id', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.params;
      const chatRooms = await Chatroom.findAll({
        where: {
          [Op.or]: [{ posterId: id }, { workerId: id }],
        },
        include: [
          {
            model: User,
            as: 'poster',
          },
          {
            model: User,
            as: 'worker',
          },
          {
            model: Job,
          },
          {
            model: ChatMessage,
            separate: true,
            order: [['createdAt', 'ASC']],
          },
        ],
        order: [['updatedAt', 'DESC']],
      });
      res.status(200).send(chatRooms);
    }
    // TODO - need else logic here
  } catch (e) {
    res.sendStatus(500);
    console.error('chatroom error', e);
  }
});

// FIND OR CREATE
chatroomRouter.post('/find', async (req, res) => {
  try {
    const chatroom = await Chatroom.findOne({
      where: {
        ...req.body,
      },
    });
    if (!chatroom) {
      const newChat = await Chatroom.create({
        ...req.body,
      });
      res.status(201).send(newChat);
    } else {
      res.status(200).send(chatroom);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

chatroomRouter.put('/chatroom/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = req.body;
    Chatroom.update(
      {
        [messages]: 0,
      },
      {
        where: { id },
      }
    );
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
});
// chatroomRouter.get('/messages/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const messages = await ChatMessage.findAll({
//       where: { chatroomId: id },
//       order: [['createdAt', 'ASC']],
//     });
//     res.status(200).send(messages);
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// });

// chatroomRouter.get('/getroom/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const room = await Chatroom.findOne({
//       where: {
//         id: id,
//       },
//       include: [
//         {
//           model: User,
//           as: 'poster',
//         },
//         {
//           model: User,
//           as: 'worker',
//         },
//         {
//           model: Job,
//         },
//       ],
//     });
//     res.status(200).send(room);
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(500);
//   }
// });

module.exports = {
  url: 'chat',
  router: chatroomRouter,
};
