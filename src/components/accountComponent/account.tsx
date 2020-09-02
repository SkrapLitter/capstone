import React from 'react';
import { useSelector } from 'react-redux';
import NotLoggedIn from '../userComponents/notLoggedIn';
import LogoutForm from '../userComponents/logout';
import { StoreState } from '../../store/store';

const Account: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);
  return (
    <div className="m-t-l m-b-s max-w-400 container">
      {user.clearance ? <LogoutForm /> : <NotLoggedIn />}
    </div>
  );
};

export default Account;
