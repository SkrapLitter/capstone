import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
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
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
