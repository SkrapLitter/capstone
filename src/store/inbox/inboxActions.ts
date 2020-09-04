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
    console.log(chatId);
    const messages = (await Axios.get(`/api/chat/messages/${chatId}`)).data;
    console.log(messages);
    dispatch(setMessages(messages));
  };
};
