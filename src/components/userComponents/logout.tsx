import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from '../../store/user/userActions';
import { StoreState } from '../../store/store';

const LogoutForm: React.FC = () => {
  const dispatch = useDispatch();
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        type="button"
        className="btn waves-effect waves-light white logOutBtn"
        onClick={() => dispatch(logoutThunk())}
      >
        Logout {user.username}
      </button>
    </div>
  );
};

export default LogoutForm;
