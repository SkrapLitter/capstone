import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/store';
import { loginThunk } from '../../store/user/userActions';

export interface StateProps {
  error: string | undefined;
}

export interface DispatchProps {
  login: (username: string, password: string) => void;
}

type Props = StateProps & DispatchProps;

const LoginForm: React.FC<Props> = (props: Props) => {
  const { login, error } = props;
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
    if (isValid()) {
      // send to server then update redux user with response
      login(username, password);
      // clear the form
      setters.forEach(fn => fn(''));
    } else {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        if (!input.classList.contains('valid')) {
          input.classList.add('invalid');
        }
      });
    }
  };

  return (
    <div className="m-t-l m-b-s max-w-400 container">
      {error && <div className="alert red lighten-5">Alert: {error}</div>}
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
          Create Account
          <i className="material-icons right">account_circle</i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  error: state.user.error,
});

const mapDispatchToProps = dispatch => {
  return {
    login: (username: string, password: string) =>
      dispatch(loginThunk(username, password)),
  };
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
