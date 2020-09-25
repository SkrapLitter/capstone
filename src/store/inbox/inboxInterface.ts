import { JobAttributes } from '../job/jobInterface';
import User from '../user/userInterface';

export interface Inbox {
  type: string;
  inbox?: Array<Chatroom>;
  messages?: Message;
  chatroom?: Chatroom;
}
export interface Chatroom {
  createdAt: string;
  posterId: string;
  workerId: string;
  userId: null;
  id: string;
  jobId: string;
  updatedAt: string;
  job: JobAttributes;
  poster: User;
  worker: User;
}
export interface InboxRedux {
  inbox: Array<Chatroom>;
  messages: Message[];
  chatroom: Chatroom;
}

export interface Message {
  author: string;
  recipient: string;
  chatroomId: string;
  createdAt: string;
  id: string;
  message: string;
  updatedAt: string;
  userId: string;
}
