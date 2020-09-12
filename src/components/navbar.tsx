import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../store/store';
import Alert from './alertComponent/alert';
import { Button } from '@material-ui/core';

const Navbar: React.FC = () => {
  const { user } = useSelector((state: StoreState) => state);
  return (
    <div className="navbar-fixed">
      <nav className="green accent-4">
        <div className="nav-wrapper">
          <Link to="/stream">(LOGO HERE)</Link>
          <ul id="nav-mobile" className="right hide-on-small-only">
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
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
