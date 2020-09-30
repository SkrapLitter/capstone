import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from '../store/user/userActions';
import InboxBadge from './inboxComponent/inboxBadge';
import { StoreState } from '../store/store';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreState) => state);
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper">
          <div>
            <Link to="/" className="navLogo">
              skräp
            </Link>
          </div>
          <div className="navList">
            <ul id="nav-mobile" className="right hide-on-small-only">
              {/* <li>
                <Button>
                  <Alert />
                </Button>
              </li> */}
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/map">Map</Link>
              </li>
              <li>
                <Link to="/inbox" className={user.clearance ? '' : 'ghost'}>
                  <InboxBadge />
                </Link>
              </li>
              <li>
                <Link to="/account" className={user.clearance ? 'ghost' : ''}>
                  Account
                </Link>
              </li>
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
                  <div className="user-profile-subnav">
                    <div>
                      <button
                        className="nav-btn"
                        onClick={() => dispatch(logoutThunk())}
                        type="button"
                      >
                        Logout
                      </button>
                    </div>
                    <div>
                      <Link to={`/stripe/${user.id}`}>Stripe</Link>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
