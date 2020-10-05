import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { loginThunk } from '../../store/user/userActions';
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

const LoginForm: React.FC = () => {
  const classes = useStyles();
  // REDUX
  const dispatch = useDispatch();
  const selectUser = (state: StoreState) => state.user;
  const error = useSelector(selectUser).error;
  // STATE
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setters = [setUsername, setPassword];

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    // validate form
    if (validate.isValid()) {
      // send to server then update redux user with response
      dispatch(loginThunk(username, password));
      // clear the form
      setters.forEach(setVal => setVal(''));
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: '400px', textAlign: 'center' }}
    >
      {error && <div className="alert red lighten-5">Alert: {error}</div>}
      <h4>Login</h4>
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
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          type="submit"
        >
          <i className="material-icons right">account_circle</i>
          &nbsp;Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
