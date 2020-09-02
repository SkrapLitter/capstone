import React from 'react';
import { Link } from 'react-router-dom';
import { StateProps } from '../reduxTest';
import { connect } from 'react-redux';
import User from '../store/user/userInterface';

interface stateProps {
  user: User;
}

type Props = stateProps;

const Navbar: React.FC<Props> = (props: Props) => {
  return (
    <div className="navbar-fixed">
      <nav className="green accent-4">
        <div className="nav-wrapper">
          <Link to="/stream">(LOGO HERE)</Link>
          <ul id="nav-mobile" className="right hide-on-small-only">
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
            <li>
              <Link to="/inbox" className={props.user.clearance ? '' : 'ghost'}>
                Inbox
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className={props.user.clearance ? 'ghost' : ''}
              >
                Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapState = (state: StateProps) => {
  return {
    user: state.user,
  };
};

export default connect<stateProps>(mapState)(Navbar);
