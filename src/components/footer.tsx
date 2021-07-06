import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="fixedFooter">
      <nav>
        <div className="navIcons">
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
