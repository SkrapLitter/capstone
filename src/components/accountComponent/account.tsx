import React from 'react';
// import CreateAccount from '../userComponents/createAccount';
import LoginForm from '../userComponents/login';

const Account: React.FC = () => {
  return (
    <div className="container">
      {/* <CreateAccount /> */}
      <LoginForm />
    </div>
  );
};

export default Account;
