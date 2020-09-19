import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from '../store/user/userActions';
import { StoreState } from '../store/store';
import Alert from './alertComponent/alert';
import { Button } from '@material-ui/core';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreState) => state);
  return (
    <div className="navbar-fixed">
      <nav className="green accent-4">
        <div className="nav-wrapper">
          <Link to="/" className="navLogo">
            skräp
          </Link>
          <ul id="nav-mobile" className="right hide-on-small-only">
            {!!user.clearance && (
              <li className="user-profile">
                <Link to="/account">
                  <img
                    src={user.image}
                    width="20"
                    height="20"
                    className="border-circle"
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                </Link>
                <div className="user-profile-subnav green accent-4">
                  <button
                    className="btn btn-small"
                    onClick={() => dispatch(logoutThunk())}
                    type="button"
                  >
                    Logout
                  </button>
                  <Link to={`/stripe/${user.id}`}>Stripe</Link>
                </div>
              </li>
            )}
            <Button>
              <Alert />
            </Button>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
            <li>
              <Link to="/inbox" className={user.clearance ? '' : 'ghost'}>
                Inbox
              </Link>
            </li>
            <li>
              <Link to="/account" className={user.clearance ? 'ghost' : ''}>
                Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
