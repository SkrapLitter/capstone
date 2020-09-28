import TYPES from '../types';
import { AppThunk } from '../thunkType';
import { Inbox, Chatroom, Message } from './inboxInterface';
import Axios from 'axios';

const setInbox = (chatrooms: Array<Chatroom>): Inbox => ({
  type: TYPES.SET_INBOX,
  chatrooms,
});
export const clearInbox = () => ({
  type: TYPES.CLEAR_INBOX,
});
export const addMessage = (message: Message): Inbox => ({
  type: TYPES.ADD_MESSAGE,
  message,
});
export const fetchUserInbox = (userId: string): AppThunk => {
  return async dispatch => {
    if (userId) {
      const chatrooms = (await Axios.get(`/api/chat/chatroom/${userId}`)).data;
      dispatch(setInbox(chatrooms));
    }
  };
};

export const findOrCreateChat = (
  jobId: string,
  posterId: string,
  workerId: string
): AppThunk => {
  return async dispatch => {
    const chatroom = (
      await Axios.post(`/api/chat/find`, {
        jobId,
        workerId,
        posterId,
      })
    ).data;
    await dispatch(fetchUserInbox(workerId));
    return chatroom;
  };
};
