import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { clearAlerts, fetchAlerts } from '../../store/alert/alertActions';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { Badge } from '@material-ui/core';
import axios from 'axios';

const Alert: React.FC = () => {
  const dispatch = useDispatch();
  const { alert, user } = useSelector((state: StoreState) => state);
  const [open, setOpen] = useState(false);
  return (
    <div className="alertPage">
      <Badge
        badgeContent={alert.newAlerts ? alert.newAlerts.length : 0}
        color="primary"
        onClick={async e => {
          e.preventDefault();
          await setOpen(!open);
          if (alert.newAlerts && alert.newAlerts.length && open) {
            dispatch(clearAlerts(alert.newAlerts, user.id));
          } else if (!open) {
            if (alert.alerts.length) {
              return new Promise(res => {
                res(
                  alert.alerts.forEach(async curAlert => {
                    await axios.delete(`/api/alert/${curAlert.id}`);
                  })
                );
              }).then(() => dispatch(fetchAlerts(user.id)));
            }
          }
        }}
      >
        <AnnouncementIcon />
      </Badge>
      <div className={open ? 'ghost' : 'alertList'}>
        {alert.alerts.length
          ? alert.alerts.map(curAlert => {
              return (
                <div key={curAlert.id}>
                  <li>{curAlert.subject}</li>
                  <br />
                  <hr />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Alert;
