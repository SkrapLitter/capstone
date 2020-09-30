import TYPES from '../types';
import { AppThunk } from '../thunkType';
import { Inbox, Chatroom, Data } from './inboxInterface';
import Axios from 'axios';

const setInbox = (chatrooms: Array<Chatroom>, userId: string): Inbox => ({
  type: TYPES.SET_INBOX,
  chatrooms,
  userId,
});
export const clearInbox = () => ({
  type: TYPES.CLEAR_INBOX,
});
export const addMessage = (data: Data): Inbox => ({
  type: TYPES.ADD_MESSAGE,
  data,
});
export const fetchUserInbox = (userId: string): AppThunk => {
  return async dispatch => {
    if (userId) {
      const chatrooms = (await Axios.get(`/api/chat/chatroom/${userId}`)).data;
      dispatch(setInbox(chatrooms, userId));
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
