import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="fixedFooter">
      <nav className="green accent-4">
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="footerIcons">
            <li>
              <Link to="/jobs">
                <i className="large material-icons">work</i>
              </Link>
            </li>
            <li>
              <Link to="/map">
                <i className="large material-icons">map</i>
              </Link>
            </li>
            <li>
              <Link to="/account">
                <i className="large material-icons">account_circle</i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
