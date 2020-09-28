import TYPES from '../types';
import { InboxRedux } from './inboxInterface';

const defaultInbox: InboxRedux = {
  chatrooms: [],
};

const inboxReducer = (state: InboxRedux = defaultInbox, action): InboxRedux => {
  switch (action.type) {
    default:
      return state;
    case TYPES.SET_INBOX:
      return {
        ...state,
        chatrooms: action.chatrooms,
      };
    case TYPES.ADD_MESSAGE:
      state.chatrooms.forEach(chatroom => {
        if (chatroom.id === action.message.chatroomId) {
          chatroom.chatMessages.push(action.message);
        }
      });
      return {
        ...state,
      };
    case TYPES.CLEAR_INBOX:
      return {
        ...defaultInbox,
      };
  }
};

export default inboxReducer;
