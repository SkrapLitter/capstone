import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccountThunk } from '../../store/user/userActions';
import { validate } from '../validation';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
  })
);

const CreateAccount: React.FC = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();
  const setters = [setUsername, setPassword, setFirstName, setLastName];

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    if (validate.isValid()) {
      // send to server then update redux user with response
      dispatch(createAccountThunk(username, password, firstName, lastName));
      // clear the form
      setters.forEach(setVal => setVal(''));
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: '400px', textAlign: 'center' }}
      id="createAccountForm"
    >
      <h4>Create Account</h4>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="username"
          label="Email"
          value={username}
          error={!!username.length && !validate.isEmail(username)}
          onChange={e => setUsername(e.target.value)}
          aria-required
          required
          helperText={
            !!username.length && !validate.isEmail(username)
              ? 'Enter a valid email address'
              : ''
          }
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          error={!!password.length && !validate.isPassword(password)}
          onChange={e => setPassword(e.target.value)}
          aria-required
          required
          helperText={
            !!password.length && !validate.isPassword(password)
              ? 'Password must be 6 chars. minimum'
              : ''
          }
        />
        <TextField
          id="firstName"
          label="First Name"
          value={firstName}
          error={!!firstName.length && !validate.isName(firstName)}
          onChange={e => setFirstName(e.target.value)}
          aria-required
          required
          helperText={
            !!firstName.length && !validate.isName(firstName)
              ? 'First name is required'
              : ''
          }
        />
        <TextField
          id="lastName"
          label="Last Name"
          value={lastName}
          error={!!lastName.length && !validate.isName(lastName)}
          onChange={e => setLastName(e.target.value)}
          aria-required
          required
          helperText={
            !!lastName.length && !validate.isName(lastName)
              ? 'Last name is required'
              : ''
          }
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
        >
          <i className="material-icons right">account_circle</i>
          &nbsp;Create Account
        </Button>
      </form>
    </div>
  );
};

export default CreateAccount;
