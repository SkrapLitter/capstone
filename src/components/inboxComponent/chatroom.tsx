/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { useParams, useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SendIcon from '@material-ui/icons/Send';
import { Message } from '../../store/inbox/inboxInterface';
import socket from '../../socket';
import axios from 'axios';

interface RouteParams {
  id: string;
}
const SelectedChatroom: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const { user, inbox } = useSelector((state: StoreState) => state);
  const chatroom = inbox.chatrooms.find(room => room.id === id);
  useEffect(() => {
    if (chatroom) {
      const messages =
        user.id === chatroom.posterId ? 'posterMessage' : 'workerMessage';
      axios.put(`/api/chat/chatroom/${id}`, { messages });
      document
        .getElementById('chatScroll')
        .scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [inbox]);
  useEffect(() => {
    const chat = document.querySelector('#chatScroll');
    if (chat) {
      chat.scrollTo(0, chat.scrollHeight);
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
  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return (
    <div>
      {user.clearance && chatroom ? (
        <>
          <div className="chatTitleContainer container">
            <div className="chatTitle">
              <div
                onClick={() => history.push('/inbox')}
                className="backIcon"
                role="button"
                onKeyDown={() => history.push('/inbox')}
              >
                <ArrowBackIosIcon
                  style={{ color: '#369BF4' }}
                  fontSize="large"
                />
              </div>
              <div>
                <img
                  className="border-circle"
                  src={chatroom.job.images[0].url}
                  alt="trash"
                  style={{ height: '75px', width: '75px' }}
                />
              </div>
              <div className="chatTitleText">
                {user.id === chatroom.posterId ? (
                  <p>
                    {chatroom.worker.firstName} {chatroom.worker.lastName}
                  </p>
                ) : (
                  <p>
                    {chatroom.poster.firstName} {chatroom.poster.lastName}
                  </p>
                )}
                <div
                  onClick={() => history.push(`/jobs/${chatroom.job.id}`)}
                  className="chatTitleLocation"
                  role="button"
                  onKeyDown={() => history.push(`/jobs/${chatroom.job.id}`)}
                >
                  <LocationOnIcon style={{ color: '#369BF4' }} />
                  <p className="charcoal" style={{ fontSize: '1.5rem' }}>
                    {chatroom.job.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="chatScroll" className="chatTopHalf container">
            <ul className="messageList">
              {chatroom.chatMessages && chatroom.chatMessages.length
                ? chatroom.chatMessages.map((curMessage: Message) => {
                    if (user.id === curMessage.recipient) {
                      return (
                        <li key={curMessage.id} style={{ listStyle: 'none' }}>
                          <div className="chatMessageL">
                            <div className="recipient">
                              <p>{curMessage.message}</p>
                            </div>
                          </div>
                        </li>
                      );
                    }
                    return (
                      <li key={curMessage.id} style={{ listStyle: 'none' }}>
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
          <div className="chatBottomHalf container">
            <form onSubmit={sendMessage} className="messageInput">
              <input
                value={message}
                type="text"
                onChange={handleText}
                style={{
                  wordBreak: 'break-word',
                  width: '100%',
                  padding: '0 10px',
                  border: '1px solid grey',
                  marginRight: '5px',
                  height: '50px',
                  borderRadius: '30px',
                }}
              />
              <Button
                variant="outlined"
                type="submit"
                style={{
                  backgroundColor: '#369BF4',
                  color: 'white',
                  width: '128px',
                }}
              >
                <SendIcon fontSize="large" />
              </Button>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SelectedChatroom;
