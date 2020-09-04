import TYPES from '../types';
import { AppThunk } from '../thunkType';
import { Inbox, Chatroom } from './inboxInterface';
import Axios from 'axios';

const setMessages = (messages: []): Inbox => ({
  type: TYPES.SET_MESSAGES,
  messages,
});
const setInbox = (inbox: []): Inbox => ({
  type: TYPES.SET_INBOX,
  inbox,
});
export const setChatroom = (chatroom: Chatroom): Inbox => ({
  type: TYPES.SET_CHATROOM,
  chatroom,
});
export const fetchUserInbox = (userId: string): AppThunk => {
  return async dispatch => {
    const inbox = (await Axios.get(`/api/chat/${userId}`)).data;
    dispatch(setInbox(inbox));
  };
};

export const fetchChatroomMessages = (chatId: string): AppThunk => {
  return async dispatch => {
    const messages = (await Axios.get(`/api/chat/messages/${chatId}`)).data;
    dispatch(setMessages(messages));
  };
};

export const findOrCreateChat = (
  userId: string,
  hostId: string,
  username: string,
  hostname: string,
  jobId: string,
  jobName: string
): AppThunk => {
  return async dispatch => {
    const chatroom = (
      await Axios.get(
        `/api/chat/job?userId=${userId}&hostId=${hostId}&username=${username}&hostname=${hostname}&jobId=${jobId}&jobName=${jobName}`
      )
    ).data;
    await dispatch(setChatroom(chatroom[0]));
    await dispatch(fetchUserInbox(userId));
    await dispatch(fetchChatroomMessages(chatroom[0].id));
    return chatroom[0];
  };
};
