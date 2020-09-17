import TYPES from '../types';
import { InboxRedux } from './inboxInterface';

const defaultInbox: InboxRedux = {
  inbox: [],
  messages: [],
  chatroom: {
    chatUsers: '',
    createdAt: '',
    id: '',
    jobId: '',
    name: '',
    updatedAt: '',
    users: [],
  },
};

const inboxReducer = (state: InboxRedux = defaultInbox, action): InboxRedux => {
  switch (action.type) {
    default:
      return state;
    case TYPES.SET_INBOX:
      return {
        ...state,
        inbox: action.inbox,
      };
    case TYPES.SET_CHATROOM:
      return {
        ...state,
        chatroom: action.chatroom,
      };
    case TYPES.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
  }
};

export default inboxReducer;
