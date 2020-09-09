import React from 'react';
import { useSelector } from 'react-redux';
import NotLoggedIn from '../userComponents/notLoggedIn';
import EditAccount from './editAccount';
import { StoreState } from '../../store/store';

const Account: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);

  return (
    <div className="m-t-l m-b-s container center">
      {!!user.clearance && <EditAccount />}
      {!user.clearance && <NotLoggedIn />}
    </div>
  );
};

export default Account;
