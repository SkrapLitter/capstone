const chatroomRouter = require('express').Router();
const {
  models: { Chatroom, User, ChatMessage },
} = require('../db');

chatroomRouter.get('/chatroom/:id', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.params;
      let chatRooms;
      if (id !== '0') {
        chatRooms = await Chatroom.findOne({
          include: {
            model: User,
            through: 'UserChat',
            where: {
              id,
            },
          },
        });
      }
      res.status(200).send(chatRooms);
    }
  } catch (e) {
    res.sendStatus(500);
    console.error('chatroom error', e);
  }
});

chatroomRouter.get('/job', async (req, res) => {
  let chatroom;
  try {
    if (req.isAuthenticated() && req.user) {
      const { userId, hostId, username, hostname, jobId, jobName } = req.query;
      let i = 0;
      let j = 0;
      while (userId[i] === hostId[j]) {
        i++;
        j++;
      }
      const [first, second] =
        userId[i] <= hostId[j] ? [userId, hostId] : [hostId, userId];
      const chatusers = `${first}/${second}`;
      chatroom = await Chatroom.findOne({
        include: {
          model: User,
        },
        where: {
          chatusers,
        },
      });
      if (!chatroom) {
        chatroom = await Chatroom.create({
          chatusers,
          name: `${jobName} with ${username} and ${hostname}`,
          jobName,
          jobId,
        });
        await ChatMessage.create({
          message: `this is the start of your chatroom with ${username} and ${hostname}`,
          author: 'system',
          chatroomId: chatroom.id,
        });
        chatroom.addUser(first);
        chatroom.addUser(second);
        chatroom = await Chatroom.findOne({
          include: {
            model: User,
          },
          where: {
            chatusers,
          },
        });
      }
      res.status(200).send(chatroom);
    }
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
});

chatroomRouter.get('/messages', async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      let messages = [];
      const { chatId, userId } = req.query;
      const chatroom = await Chatroom.findAll({
        include: {
          model: User,
          through: 'UserChat',
          where: {
            id: userId,
          },
        },
        where: {
          id: chatId,
        },
      });
      if (chatroom) {
        messages = await ChatMessage.findAll({
          where: {
            chatroomId: chatId,
          },
          order: [['createdAt', 'ASC']],
        });
      }
      res.status(200).send(messages);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

chatroomRouter.post(`/messages/:id`, async (req, res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const { id } = req.params;
      const { message, author, userId } = req.body;
      ChatMessage.create({
        message,
        author,
        userId,
        chatroomId: id,
      });
    }
  } catch (e) {
    console.error('error posting message', e);
    res.sendStatus(500);
  }
});
module.exports = {
  url: 'chat',
  router: chatroomRouter,
};
