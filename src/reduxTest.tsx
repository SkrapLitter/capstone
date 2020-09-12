import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from './store/store';
import User from './store/user/userInterface';
import io from 'socket.io-client';

const SOCKET_IO_URL = 'http://localhost:3000';
const socket = io(SOCKET_IO_URL);

socket.on('connect', () => {
  console.log(`connected + ${socket.id}`);
});
socket.on('disconnect', function () {
  console.log('disconnected');
});
export interface StateProps {
  user: User;
}
const ReduxTest: React.FC<StateProps> = (props: StateProps) => {
  return (
    <div>
      <h2>
        Welcome, {props.user.firstName} {props.user.lastName}!
      </h2>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.user,
});

export default connect<StateProps>(mapStateToProps)(ReduxTest);