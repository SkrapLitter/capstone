import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { clearAlerts } from '../../store/alert/alertActions';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { Badge } from '@material-ui/core';

const Alert: React.FC = () => {
  const dispatch = useDispatch();
  const { alert, user } = useSelector((state: StoreState) => state);
  const [open, setOpen] = useState(false);
  return (
    <div className="alertPage">
      <Badge
        badgeContent={alert.newAlerts ? alert.newAlerts.length : 0}
        color="primary"
        onClick={e => {
          e.stopPropagation();
          setOpen(!open);
          if (alert.newAlerts && alert.newAlerts.length) {
            dispatch(clearAlerts(alert.newAlerts, user.id));
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
