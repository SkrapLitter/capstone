export interface Inbox {
  type: string;
  inbox?: [];
  messages?: [];
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
  inbox: [];
  messages: [];
  chatroom: Chatroom;
}
