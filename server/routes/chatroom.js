const chatroomRouter = require('express').Router();
const {
  models: { Chatroom, UserChat, User, ChatMessage },
} = require('../db');
const ChatRoom = require('../db/models/chatroom');

chatroomRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const chatRooms = await Chatroom.findAll(
      { include: [{ model: User, through: UserChat }] },
      {
        where: {
          userId: id,
        },
      }
    );
    res.status(200).send(chatRooms);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
});

chatroomRouter.get('/messageJob', async (req, res) => {
  let chatroom;
  try {
    const { userId, hostId, username, hostname } = req.query;
    const [first, second] =
      userId[0] <= hostId[0] ? [userId, hostId] : [hostId, userId];
    const chatusers = `${first}/${second}`;
    chatroom = await ChatRoom.findAll({
      include: {
        model: ChatMessage,
      },
      where: {
        chatusers,
      },
    });
    if (!chatroom) {
      chatroom = await ChatRoom.create({
        chatusers,
        name: `Chat with ${username} and ${hostname}`,
      });
    }
    res.status(200).send(chatroom);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
});

chatroomRouter.get('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await ChatMessage.findAll({
      where: {
        chatroomId: id,
      },
      order: [['createdAt', 'ASC']],
    });
    res.status(200).send(messages);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

chatroomRouter.post(`/messages/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { message, author, userId } = req.body;
    ChatMessage.create({
      message,
      author,
      userId,
      chatroomId: id,
    });
  } catch (e) {
    console.error('error posting message', e);
    res.sendStatus(500);
  }
});
module.exports = {
  url: 'chat',
  router: chatroomRouter,
};
