import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import {
  fetchChatroomMessages,
  // setChatroom,
  getChatroom,
} from '../../store/inbox/inboxActions';
import { useParams } from 'react-router';
// import User from '../../store/user/userInterface';
import { Button } from '@material-ui/core';
// import moment from 'moment';
import { Message } from '../../store/inbox/inboxInterface';
import socket from '../../socket';

interface RouteParams {
  id: string;
}
const SelectedChatroom: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [message, setMessage] = useState('');
  const { user, inbox } = useSelector((state: StoreState) => state);
  const { chatroom } = inbox;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChatroom(id));
    dispatch(fetchChatroomMessages(id));
  }, []);
  socket.on('connect', () => {
    socket.emit('create', id);
    socket.on('message', () => {
      dispatch(fetchChatroomMessages(id));
    });
  });

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipient =
      user.id === chatroom.workerId ? chatroom.posterId : chatroom.workerId;
    socket.emit('message', {
      message: message,
      chatroomId: id,
      author: user.id,
      recipient: recipient,
    });
    dispatch(fetchChatroomMessages(id));
    setMessage('');
  };
  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      {user.clearance ? (
        <div className="chatBox">
          <div className="container">
            <ul>
              {inbox.messages && inbox.messages.length
                ? inbox.messages.map((curMessage: Message) => {
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
