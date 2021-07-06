import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { Link } from 'react-router-dom';
import { fetchUserInbox } from '../../store/inbox/inboxActions';
import { Chatroom } from '../../store/inbox/inboxInterface';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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
                  <div className="inbox-item">
                    <Paper key={chatroom.id} elevation={3}>
                      <ListItem>
                        <ListItemIcon>
                          <Forum color="primary" />
                        </ListItemIcon>
                        <ListItemText>
                          <Link
                            to={`/inbox/${chatroom.id}`}
                            className="inbox-link"
                          >
                            {user.id === chatroom.job.userId ? (
                              <>
                                <p>
                                  {chatroom.worker.firstName}{' '}
                                  {chatroom.worker.lastName}
                                  {' - '}
                                  {chatroom.job.name}
                                </p>
                                <p className="new-message">
                                  {chatroom.posterMessage
                                    ? `  ${chatroom.posterMessage} new Message${
                                        chatroom.posterMessage > 1 ? 's' : ''
                                      }!`
                                    : ''}
                                </p>
                              </>
                            ) : (
                              <>
                                <p>
                                  {chatroom.poster.firstName}{' '}
                                  {chatroom.poster.lastName} {' - '}
                                  {chatroom.job.name}
                                </p>
                                <p className="new-message">
                                  {chatroom.workerMessage
                                    ? `  ${chatroom.workerMessage} new Message${
                                        chatroom.workerMessage > 1 ? 's' : ''
                                      }!`
                                    : ''}
                                </p>
                              </>
                            )}
                          </Link>
                        </ListItemText>
                      </ListItem>
                    </Paper>
                  </div>
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
