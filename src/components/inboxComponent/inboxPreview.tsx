import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Forum from '@material-ui/icons/Forum';

const InboxPreview: React.FC = () => {
  const selectInbox = (state: StoreState) => state.inbox;
  const inbox = useSelector(selectInbox);

  return (
    <div id="messages">
      <Box py={5}>
        {inbox.chatrooms.length ? (
          <List>
            {inbox.chatrooms.map(chatroom => (
              <ListItem key={chatroom.id}>
                <ListItemIcon>
                  <Forum />
                </ListItemIcon>
                <ListItemText>
                  <Link to={`/inbox/${chatroom.id}`}>{chatroom.job.name}</Link>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No new messages</p>
        )}
      </Box>
    </div>
  );
};

export default InboxPreview;
