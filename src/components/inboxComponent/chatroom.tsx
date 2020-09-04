import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { fetchChatroomMessages } from '../../store/inbox/inboxActions';
import { RouteComponentProps } from 'react-router';
import User from '../../store/user/userInterface';
import { TextField } from '@material-ui/core';
import io from 'socket.io-client';
import moment from 'moment';
import { Message } from '../../store/inbox/inboxInterface';

type TParams = { id: string };
const SelectedChatroom: React.FC<RouteComponentProps<TParams>> = ({
  match,
}: RouteComponentProps<TParams>) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatroomMessages(id));
  }, []);
  const [message, setMessage] = useState('');
  const { user, inbox } = useSelector((state: StoreState) => state);
  const { chatroom } = inbox;
  const SOCKET_IO_URL = 'http://localhost:3000';
  const socket = io(SOCKET_IO_URL);
  socket.on('connect', () => {
    socket.emit('join', chatroom.name);
  });
  const sendMessage = e => {
    if (e.key === 'Enter') {
      socket.emit('message', {
        message,
        author: user.username,
        userId: user.id,
        chatroomId: chatroom.id,
      });
    }
  };
  socket.on('newMessage', data => {
    console.log('data:', data, 'id:', id);
    setTimeout(() => dispatch(fetchChatroomMessages(id)), 500);
  });
  return (
    <div>
      {user.clearance ? (
        <>
          <h2>{chatroom.name}</h2>
          <ul>
            {chatroom.users.map((curUser: User) => {
              return (
                <li key={curUser.id}>
                  {curUser.firstName} {curUser.lastName}
                </li>
              );
            })}
          </ul>
          <ul>
            {inbox.messages && inbox.messages.length
              ? inbox.messages.map((curMessage: Message) => {
                  return (
                    <li key={curMessage.id}>
                      Time Sent:
                      {moment(curMessage.createdAt).format('HH:mm:ss')}:
                      <br />
                      {curMessage.message}
                      <br />
                      From :{curMessage.author}
                      <hr />
                    </li>
                  );
                })
              : null}
          </ul>
          <TextField
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="enter message here"
            onKeyPress={e => sendMessage(e)}
          />
        </>
      ) : (
        <h2>Please Log In To See This Page</h2>
      )}
    </div>
  );
};

export default SelectedChatroom;
