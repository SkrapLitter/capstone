import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { Link } from 'react-router-dom';
import { fetchUserInbox, setChatroom } from '../../store/inbox/inboxActions';
import { Chatroom } from '../../store/inbox/inboxInterface';
import { Button } from '@material-ui/core';

const Inbox: React.FC = () => {
  const dispatch = useDispatch();
  const { user, inbox } = useSelector((state: StoreState) => state);
  useEffect(() => {
    dispatch(fetchUserInbox(user.id));
  }, []);
  return (
    <div>
      {user.clearance ? (
        <>
          <h4>{user.username} inbox</h4>
          {inbox.inbox && inbox.inbox.length ? (
            inbox.inbox.map((chatroom: Chatroom) => {
              return (
                <div key={chatroom.id}>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      dispatch(setChatroom(chatroom));
                    }}
                  >
                    <Link to={`/inbox/${chatroom.id}`}>{chatroom.name}</Link>
                  </Button>
                </div>
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
