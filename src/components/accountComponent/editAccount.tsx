import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import LogoutForm from '../userComponents/logout';
import { validate } from '../validation';
import { updateAccountThunk } from '../../store/user/userActions';

const EditAccount: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);

  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(user.username);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  const toggleDisabled = (labelId: string): void => {
    const input = document.getElementById(labelId) as HTMLInputElement;

    if (input.disabled) {
      input.disabled = false;
    }
  };

  const setDisabled = formId => {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input') as NodeListOf<
      HTMLInputElement
    >;

    inputs.forEach(input => {
      if (!input.disabled) {
        input.disabled = true;
      }
    });
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (validate.isFormValid('accountForm')) {
      const { id } = user;
      const updatedUser = {
        username,
        firstName,
        lastName,
      };

      dispatch(updateAccountThunk(id, updatedUser));

      setDisabled('accountForm');
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
  return (
    <>
      <div className="container" id="accountForm">
        <h4>User Profile</h4>
        <div className="row">
          <div className="col s11 input-field">
            <input
              autoComplete="off"
              disabled
              value={firstName}
              onChange={e => handleChange(e, setFirstName, 'fnLabel')}
              type="text"
              className={validate.setClassName(validate.isName(firstName))}
              id="firstName"
            />
            <label htmlFor="firstName" className="active" id="fnLabel">
              First Name
            </label>
          </div>
          <div className="col s1">
            <button
              onClick={() => toggleDisabled('firstName')}
              className="btn-floating btn-small waves-effect waves-light"
              type="submit"
            >
              <i className="material-icons">create</i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s11 input-field">
            <input
              autoComplete="off"
              disabled
              value={lastName}
              onChange={e => handleChange(e, setLastName, 'lnLabel')}
              type="text"
              className={validate.setClassName(validate.isName(lastName))}
              id="lastName"
            />
            <label htmlFor="lastName" className="active" id="lnLabel">
              Last Name
            </label>
          </div>
          <div className="col s1">
            <button
              onClick={() => toggleDisabled('lastName')}
              className="btn-floating btn-small waves-effect waves-light"
              type="submit"
            >
              <i className="material-icons">create</i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s11 input-field">
            <input
              autoComplete="off"
              disabled
              value={username}
              onChange={e => handleChange(e, setUsername, 'emLabel')}
              type="email"
              className={validate.setClassName(validate.isEmail(username))}
              id="email"
            />
            <label htmlFor="email" className="active" id="emLabel">
              Email
            </label>
          </div>
          <div className="col s1">
            <button
              onClick={() => toggleDisabled('email')}
              className="btn-floating btn-small waves-effect waves-light"
              type="submit"
            >
              <i className="material-icons">create</i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col s1">
            <button
              onClick={handleSubmit}
              className="btn-floating btn-small waves-effect waves-light"
              type="submit"
            >
              <i className="material-icons">create</i>
            </button>
          </div>
        </div>
        <div className="center">
          <button
            onClick={handleSubmit}
            className="btn waves-effect waves-light green accent-4"
            type="submit"
          >
            Update Account
            <i className="material-icons right">account_circle</i>
          </button>
        </div>
      </div>
      <LogoutForm />
    </>
  );
};

export default EditAccount;
