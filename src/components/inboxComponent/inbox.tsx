import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { Link } from 'react-router-dom';
import { fetchUserInbox } from '../../store/inbox/inboxActions';
import { Chatroom } from '../../store/inbox/inboxInterface';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Forum from '@material-ui/icons/Forum';

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
          <Typography variant="h4" component="h1">
            Inbox
          </Typography>
          {inbox.chatrooms.length ? (
            <List>
              {inbox.chatrooms.map((chatroom: Chatroom) => {
                return (
                  <ListItem key={chatroom.id}>
                    <ListItemIcon>
                      <Forum />
                    </ListItemIcon>
                    <ListItemText>
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
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography variant="h4" component="h1">
              No chats yet!
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h4" component="h1">
          Please Log In To See This Page
        </Typography>
      )}
    </div>
  );
};

export default Inbox;
