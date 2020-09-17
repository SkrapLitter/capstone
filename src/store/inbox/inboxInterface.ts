export interface Inbox {
  type: string;
  inbox?: Array<Chatroom>;
  messages?: Message;
  chatroom?: Chatroom;
}
export interface Chatroom {
  chatUsers: string;
  createdAt: string;
  id: string;
  jobId: string;
  name: string;
  updatedAt: string;
  users: [];
}
export interface InboxRedux {
  inbox: Array<Chatroom>;
  messages: Message[];
  chatroom: Chatroom;
}

export interface Message {
  author: string;
  chatroomId: string;
  createdAt: string;
  id: string;
  message: string;
  updatedAt: string;
  userId: string;
}
