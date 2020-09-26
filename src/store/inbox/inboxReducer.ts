import TYPES from '../types';
import { InboxRedux } from './inboxInterface';

const defaultInbox: InboxRedux = {
  inbox: [],
  messages: [],
  chatroom: {
    id: '',
    createdAt: '',
    updatedAt: '',
    posterId: '',
    workerId: '',
    userId: null,
    jobId: '',
    job: {
      id: '',
      name: '',
      status: '',
      price: 0,
      city: '',
      state: '',
      address: '',
      reserved: false,
      reservedUser: null,
      reservedUsername: null,
      lat: 0,
      lng: 0,
      description: '',
      summary: '',
      createdUser: '',
      funded: 0,
      userId: '',
      updatedAt: '',
      createdAt: '',
    },
    poster: {
      id: '',
      username: '',
      firstName: '',
      lastName: '',
      image: '',
      clearance: 0,
      error: '',
      stripe: '',
      balance: 0,
    },
    worker: {
      id: '',
      username: '',
      firstName: '',
      lastName: '',
      image: '',
      clearance: 0,
      error: '',
      stripe: '',
      balance: 0,
    },
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
    case TYPES.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
  }
};

export default inboxReducer;
