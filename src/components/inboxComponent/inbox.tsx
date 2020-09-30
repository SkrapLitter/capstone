import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { Link } from 'react-router-dom';
import { fetchUserInbox } from '../../store/inbox/inboxActions';
import { Paper } from '@material-ui/core';
import { Chatroom } from '../../store/inbox/inboxInterface';

const Inbox: React.FC = () => {
  const dispatch = useDispatch();
  const { user, inbox } = useSelector((state: StoreState) => state);
  useEffect(() => {
    dispatch(fetchUserInbox(user.id));
  }, [user.id]);
  return (
    <div className="container">
      {user.clearance ? (
        <>
          <h4>Inbox</h4>
          {inbox.chatrooms.length ? (
            inbox.chatrooms.map((chatroom: Chatroom) => {
              return (
                <Paper key={chatroom.id}>
                  <div className="inboxCard">
                    <Link to={`/inbox/${chatroom.id}`}>
                      {user.id === chatroom.job.userId ? (
                        <>
                          <p>
                            {chatroom.worker.firstName}{' '}
                            {chatroom.worker.lastName}
                            {' - '}
                            {chatroom.job.name}
                          </p>
                          {chatroom.posterMessage
                            ? `(${chatroom.posterMessage}) new Messages!`
                            : ''}
                        </>
                      ) : (
                        <>
                          <p>
                            {chatroom.poster.firstName}{' '}
                            {chatroom.poster.lastName} {' - '}
                            {chatroom.job.name}
                          </p>
                          {chatroom.workerMessage
                            ? `(${chatroom.workerMessage}) new Messages!`
                            : ''}
                        </>
                      )}
                    </Link>
                  </div>
                </Paper>
              );
            })
          ) : (
            <h2>No chats yet!</h2>
          )}
        </>
      ) : (
        <h2>Please Log In To See This Page</h2>
      )}
    </div>
  );
};

export default Inbox;
