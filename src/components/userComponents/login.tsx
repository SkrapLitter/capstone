import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { loginThunk } from '../../store/user/userActions';

const LoginForm: React.FC = () => {
  // REDUX
  const dispatch = useDispatch();
  const selectUser = (state: StoreState) => state.user;
  const error = useSelector(selectUser).error;
  // STATE
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setters = [setUsername, setPassword];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: React.Dispatch<React.SetStateAction<string>>,
    labelId: string
  ): void => {
    // control form field value
    set(e.target.value);
    // get the label
    const label = document.getElementById(labelId);
    // toggle class for label animation
    /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
    e.target.value
      ? label.classList.add('active')
      : label.classList.remove('active');
  };

  const isValid = (): boolean => {
    return document.querySelectorAll('.valid').length === 2;
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    // validate form
    if (isValid()) {
      // send to server then update redux user with response
      dispatch(loginThunk(username, password));
      // clear the form
      setters.forEach(fn => fn(''));
    } else {
      const inputs = document.querySelectorAll('input');
      // add invalid class to invalid fields
      inputs.forEach(input => {
        if (!input.classList.contains('valid')) {
          input.classList.add('invalid');
        }
      });
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: '400px', textAlign: 'center' }}
    >
      {error && <div className="alert red lighten-5">Alert: {error}</div>}
      <h4>Login</h4>
      <div className="input-field fsField">
        <input
          value={username}
          onChange={e => handleChange(e, setUsername, 'emLabel')}
          type="email"
          className={
            username.length
              ? /^[a-zA-Z0-9_.]+@[a-zA-Z0-9-.]+\.[a-z]{2,}$/.test(username)
                ? 'valid'
                : 'invalid'
              : ''
          }
          id="email"
        />
        <label htmlFor="email" id="emLabel">
          Email
        </label>
      </div>
      <div className="input-field fsField">
        <input
          value={password}
          onChange={e => handleChange(e, setPassword, 'pwLabel')}
          type="password"
          id="password"
          className={
            password.length
              ? /^[a-z0-9!@#$%^&*()_-]{6,}/i.test(password)
                ? 'valid'
                : 'invalid'
              : ''
          }
        />
        <label htmlFor="password" id="pwLabel">
          Password
        </label>
      </div>
      <div className="center">
        <button
          onClick={handleSubmit}
          className="btn waves-effect waves-light green accent-4"
          type="submit"
        >
          Login
          <i className="material-icons right">account_circle</i>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
