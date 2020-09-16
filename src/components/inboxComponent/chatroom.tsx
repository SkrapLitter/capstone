import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { fetchChatroomMessages } from '../../store/inbox/inboxActions';
import { useParams } from 'react-router';
import User from '../../store/user/userInterface';
import { TextField } from '@material-ui/core';
import moment from 'moment';
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
    dispatch(fetchChatroomMessages(id, user.id));
  }, []);
  const sendMessage = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      socket.emit('message', {
        message,
        author: user.username,
        userId: user.id,
        chatroomId: chatroom.id,
      });
      setMessage('');
    }
  };
  return (
    <div>
      {user.clearance && inbox.messages.length ? (
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
