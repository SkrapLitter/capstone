import TYPES from '../types';
import { InboxRedux } from './inboxInterface';

let number;

const defaultInbox: InboxRedux = {
  chatrooms: [],
  newChatroomMessage: 0,
};

const inboxReducer = (state: InboxRedux = defaultInbox, action): InboxRedux => {
  switch (action.type) {
    default:
      return state;
    case TYPES.SET_INBOX:
      number = 0;
      action.chatrooms.forEach(chatroom => {
        const userRole =
          action.userId === chatroom.job.userId ? `poster` : 'worker';
        if (chatroom.posterMessage && userRole === 'poster') number++;
        else if (chatroom.workerMessage && userRole === 'worker') number++;
      });
      return {
        newChatroomMessage: number,
        chatrooms: action.chatrooms,
      };
    case TYPES.ADD_MESSAGE:
      number = state.newChatroomMessage;
      state.chatrooms.forEach(chatroom => {
        if (chatroom.id === action.data.newMessage.chatroomId) {
          if (action.data.recipient) {
            const userRole =
              action.userId === chatroom.job.userId ? `poster` : 'worker';
            if (userRole === 'poster') {
              if (chatroom.posterMessage === 0) {
                number++;
                chatroom.posterMessage++;
              } else chatroom.posterMessage++;
            } else if (userRole === 'worker') {
              if (chatroom.workerMessage === 0) {
                number++;
                chatroom.workerMessage++;
              } else chatroom.workerMessage++;
            }
          }
          chatroom.chatMessages.push(action.data.newMessage);
        }
      });
      return {
        ...state,
        newChatroomMessage: number,
      };
    case TYPES.CLEAR_INBOX:
      return {
        ...defaultInbox,
      };
  }
};

export default inboxReducer;
