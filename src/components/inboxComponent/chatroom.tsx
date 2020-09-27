import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { useParams } from 'react-router';
import { Button } from '@material-ui/core';
// import moment from 'moment';
import { Message } from '../../store/inbox/inboxInterface';
import socket from '../../socket';
import axios from 'axios';

interface RouteParams {
  id: string;
}
const SelectedChatroom: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [message, setMessage] = useState('');
  const { user, inbox } = useSelector((state: StoreState) => state);
  const chatroom = inbox.chatrooms.find(room => room.id === id);
  useEffect(() => {
    if (chatroom) {
      const messages =
        user.id === chatroom.posterId ? 'posterMessage' : 'workerMessage';
      axios.put(`/api/chat/chatroom/${id}`, { messages });
    }
  }, [inbox]);
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [recipient, title] =
      user.id === chatroom.workerId
        ? [chatroom.posterId, 'posterMessage']
        : [chatroom.workerId, 'workerMessage'];
    socket.emit('message', {
      message: message,
      chatroomId: id,
      recipient: recipient,
      author: user.id,
      title,
    });
    setMessage('');
  };
  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      {user.clearance && chatroom ? (
        <div className="chatBox">
          <div className="container">
            <ul>
              {chatroom.chatMessages && chatroom.chatMessages.length
                ? chatroom.chatMessages.map((curMessage: Message) => {
                    if (user.id === curMessage.recipient) {
                      return (
                        <li key={curMessage.id}>
                          <div className="chatMessageL">
                            <div className="recipient">
                              <p>{curMessage.message}</p>
                            </div>
                          </div>
                        </li>
                      );
                    }
                    return (
                      <li key={curMessage.id}>
                        <div className="chatMessageR">
                          <div className="sender">
                            <p>{curMessage.message}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
          <form onSubmit={sendMessage}>
            <div className="messageInput">
              <textarea
                value={message}
                onChange={handleText}
                style={{ marginRight: '5px' }}
              />
              <Button variant="outlined" type="submit">
                Send
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default SelectedChatroom;
