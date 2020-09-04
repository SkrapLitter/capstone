import React from 'react';
import CreateAccount from './createAccount';
import { Dialog } from '@material-ui/core';

const CreateAccountOverlay: React.FC = () => {
  return (
    <Dialog aria-labelledby="create-account-first" open={true}>
      <div className="white" style={{ padding: '2em' }}>
        <CreateAccount />
      </div>
    </Dialog>
  );
};

export default CreateAccountOverlay;
