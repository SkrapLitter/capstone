import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlerts } from '../../store/alert/alertActions';
import { StoreState } from '../../store/store';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import moment from 'moment';

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
            return (
              <>
                <List key={curAlert.id}>
                  <ListItem>{curAlert.subject} </ListItem>
                  <ListItem>
                    {moment(curAlert.createdAt).format('MMMM Do YYYY, h:mm a')}
                  </ListItem>
                </List>
                <hr />
              </>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default Alert;
