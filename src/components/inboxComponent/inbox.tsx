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
  console.log(inbox.inbox);
  console.log('USER', user);
  return (
    <div className="container">
      {user.clearance ? (
        <>
          <h4>Inbox</h4>
          {inbox.inbox.length ? (
            inbox.inbox.map((chatroom: Chatroom) => {
              return (
                <Paper key={chatroom.id}>
                  <div key={chatroom.id} className="inboxCard">
                    <Link to={`/inbox/${chatroom.id}`}>
                      {user.id === chatroom.job.userId
                        ? `${chatroom.worker.firstName} ${chatroom.worker.lastName}`
                        : `${chatroom.poster.firstName} ${chatroom.poster.lastName}`}
                      {' - '}
                      {chatroom.job.name}
                    </Link>
                  </div>
                </Paper>
                // <div key={chatroom.id}>
                //   <h3>{chatroom.job.name}</h3>
                //   <Button
                //     onClick={e => {
                //       e.preventDefault();
                //       dispatch(setChatroom(chatroom));
                //     }}
                //   >
                //     <Link to={`/inbox/${chatroom.id}`}>

                //       {chatroom.job.name}
                //     </Link>
                //   </Button>
                // </div>
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
