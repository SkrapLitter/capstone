import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlerts } from '../../store/alert/alertActions';
import { StoreState } from '../../store/store';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Alert: React.FC = () => {
  const dispatch = useDispatch();
  const { user, alert } = useSelector((state: StoreState) => state);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchAlerts(user.id));
    }
  }, []);
  return (
    <Box py={5}>
      {alert && alert.length && (
        <List>
          {alert.map(curAlert => {
            return <ListItem key={curAlert.id}>{curAlert.subject}</ListItem>;
          })}
        </List>
      )}
    </Box>
  );
};

export default Alert;
