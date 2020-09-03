import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from '../../store/user/userActions';
import { StoreState } from '../../store/store';

const LogoutForm: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.user);
  return (
    <button
      type="button"
      className="btn waves-effect waves-light grey accent-4"
      onClick={() => dispatch(logoutThunk())}
    >
      Logout {user.username}
    </button>
  );
};

export default LogoutForm;
