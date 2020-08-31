import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from './store/store';
import User from './store/user/userInterface';

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
