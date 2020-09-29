import React, { useEffect } from 'react';
import { Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { fetchUserInbox } from '../../store/inbox/inboxActions';

const inboxBadge: React.FC = () => {
  const { inbox, user } = useSelector((state: StoreState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInbox(user.id));
  }, []);
  return (
    <Badge badgeContent={inbox.newChatroomMessage} color="primary">
      <MailIcon />
    </Badge>
  );
};

export default inboxBadge;
