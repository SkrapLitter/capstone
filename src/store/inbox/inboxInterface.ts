import { JobAttributes } from '../job/jobInterface';
import User from '../user/userInterface';

export interface Inbox {
  type: string;
  chatrooms?: Array<Chatroom>;
  data?: Data;
  chatroomId?: string;
  userId?: string;
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
  posterMessage: number;
  workerMessage: number;
  chatMessages: Array<Message>;
}
export interface InboxRedux {
  chatrooms: Array<Chatroom>;
  newChatroomMessage: number;
}
export interface Data {
  newMessage?: Chatroom;
  recipient?: string;
  author?: string;
}
export interface Message {
  author: string;
  recipient: string;
  chatroomId: string;
  createdAt: string;
  id: string;
  message: string;
  updatedAt: string;
}
