import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlerts } from '../../store/alert/alertActions';
import { StoreState } from '../../store/store';

const Alert: React.FC = () => {
  const dispatch = useDispatch();
  const { user, alert } = useSelector((state: StoreState) => state);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchAlerts(user.id));
    }
  }, []);
  return (
    <div>
      {alert && alert.length && (
        <ul>
          {alert.map(curAlert => {
            return <li key={curAlert.id}>{curAlert.subject}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default Alert;
