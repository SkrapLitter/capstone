import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/store';
import User from '../../store/user/userInterface';
import { createAccountThunk } from '../../store/user/userActions';

export interface StateProps {
  user: User;
}
export interface DispatchProps {
  createAccount: (
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void;
}
type Props = StateProps & DispatchProps;

const CreateAccount: React.FC<Props> = (props: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { createAccount, user } = props;
  const setters = [setUsername, setPassword, setFirstName, setLastName];

  const isValid = (): boolean => {
    return document.querySelectorAll('.valid').length === 4;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid()) {
      // send to server then update redux user with response
      createAccount(username, password, firstName, lastName);
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

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div
      className="container"
      style={{ maxWidth: '400px', textAlign: 'center' }}
    >
      <h3>Create Account</h3>
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
      <div className="input-field fsField">
        <input
          value={firstName}
          onChange={e => handleChange(e, setFirstName, 'fnLabel')}
          id="firstName"
          className={
            firstName.length
              ? firstName.length >= 2
                ? 'valid'
                : 'invalid'
              : ''
          }
        />
        <label htmlFor="firstName" id="fnLabel">
          First Name
        </label>
      </div>
      <div className="input-field fsField">
        <input
          value={lastName}
          onChange={e => handleChange(e, setLastName, 'lnLabel')}
          id="lastName"
          className={
            lastName.length ? (lastName.length >= 2 ? 'valid' : 'invalid') : ''
          }
        />
        <label htmlFor="lastName" id="lnLabel">
          Last Name
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
  user: state.user,
});

const mapDispatchToProps = dispatch => {
  return {
    createAccount: (
      username: string,
      password: string,
      firstName: string,
      lastName: string
    ) => dispatch(createAccountThunk(username, password, firstName, lastName)),
  };
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount);
