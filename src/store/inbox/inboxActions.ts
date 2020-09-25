import TYPES from '../types';
import { AppThunk } from '../thunkType';
import { Inbox, Chatroom, Message } from './inboxInterface';
import Axios from 'axios';

const setMessages = (messages: Message): Inbox => ({
  type: TYPES.SET_MESSAGES,
  messages,
});
const setInbox = (inbox: Array<Chatroom>): Inbox => ({
  type: TYPES.SET_INBOX,
  inbox,
});
export const setChatroom = (chatroom: Chatroom): Inbox => ({
  type: TYPES.SET_CHATROOM,
  chatroom,
});
export const fetchUserInbox = (userId: string): AppThunk => {
  return async dispatch => {
    if (userId) {
      const inbox = (await Axios.get(`/api/chat/chatroom/${userId}`)).data;
      dispatch(setInbox(inbox));
    }
  };
};

export const getChatroom = (chatroomId: string): AppThunk => {
  return async dispatch => {
    const chatroom = (await Axios.get(`/api/chat/getroom/${chatroomId}`)).data;
    dispatch(setChatroom(chatroom));
  };
};
// export const fetchChatroomMessages = (
//   chatId: string,
//   userId: string
// ): AppThunk => {
//   return async dispatch => {
//     if (userId) {
//       const messages = (
//         await Axios.get(`/api/chat/messages?chatId=${chatId}&userId=${userId}`)
//       ).data;
//       dispatch(setMessages(messages));
//     }
//   };
// };

export const fetchChatroomMessages = (chatroomId: string): AppThunk => {
  return async dispatch => {
    const messages = (await Axios.get(`/api/chat/messages/${chatroomId}`)).data;
    dispatch(setMessages(messages));
  };
};

// export const findOrCreateChat = (
//   userId: string,
//   hostId: string,
//   username: string,
//   hostname: string,
//   jobId: string,
//   jobName: string
// ): AppThunk => {
//   return async dispatch => {
//     const chatroom = (
//       await Axios.get(
//         `/api/chat/job?userId=${userId}&hostId=${hostId}&username=${username}&hostname=${hostname}&jobId=${jobId}&jobName=${jobName}`
//       )
//     ).data;
//     if (chatroom) {
//       console.log(chatroom);
//       await dispatch(setChatroom(chatroom));
//       await dispatch(fetchChatroomMessages(chatroom.id, userId));
//       await dispatch(fetchUserInbox(userId));
//       return chatroom;
//     }
//   };
// };

// export const findOrCreateChat = (
//   jobId: string,
//   posterId: string,
//   workerId: string
// ): AppThunk => {
//   return async dispatch => {
//     const chatroom = (
//       await Axios.post(`/api/chat/find`, {
//         jobId,
//         workerId,
//         posterId,
//       })
//     ).data;
//     console.log(chatroom);
//   };
// };

export const findOrCreateChat = async (
  jobId: string,
  posterId: string,
  workerId: string
): Promise<Chatroom> => {
  const chatroom = (
    await Axios.post(`/api/chat/find`, {
      jobId,
      workerId,
      posterId,
    })
  ).data;
  return chatroom;
};
