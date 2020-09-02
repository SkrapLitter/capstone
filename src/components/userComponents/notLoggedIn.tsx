import React, { useState } from 'react';
import CreateAccount from './createAccount';
import LoginForm from './login';

const NotLoggedIn: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      {showLogin ? (
        <div>
          <p className="charcoal">
            Don't have an account?
            <button
              onClick={() => {
                setShowLogin(false);
              }}
              type="button"
              className="anchor"
            >
              {' '}
              Sign up
            </button>
            for free!
          </p>
          <LoginForm />
        </div>
      ) : (
        <div>
          <p className="charcoal">
            Already have an account?{' '}
            <button
              onClick={() => {
                setShowLogin(true);
              }}
              type="button"
              className="anchor"
            >
              Login.
            </button>
          </p>
          <CreateAccount />
        </div>
      )}
    </div>
  );
};

export default NotLoggedIn;
