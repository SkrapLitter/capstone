import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from '../../store/user/userActions';
// import {  ThunkDispatch } from 'redux-thunk';
import { StoreState } from '../../store/store';
// import { Action } from 'redux';

// interface DispatchProps {
//     logout: () => void;
// }

// type Props = DispatchProps;

const LogoutForm: React.FC = () => {
  // const {logout} = props;
  const dispatch = useDispatch();
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);
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

// const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState,any,Action>): DispatchProps => {
//     return {
//         logout: () =>  dispatch(logoutThunk())
//     }
// }
export default LogoutForm;
// export default connect<null, DispatchProps>(null, mapDispatchToProps)(LogoutForm)
