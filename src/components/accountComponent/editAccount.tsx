import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { validate } from '../validation';
import { updateAccountThunk } from '../../store/user/userActions';

import M from 'materialize-css';

const EditAccount: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);

  const selectJob = (state: StoreState) => state.job;
  const job = useSelector(selectJob);

  const selectInbox = (state: StoreState) => state.inbox;
  const inbox = useSelector(selectInbox);

  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(user.username);
    setFirstName(user.firstName);
    setLastName(user.lastName);

    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs);
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
      <img
        src={user.image}
        width="50"
        height="50"
        className="border-circle"
        alt={`${firstName} ${lastName}`}
      />
      <h4>
        <strong>
          {firstName} {lastName}
        </strong>
      </h4>
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s3">
              <a href="#edit-profile" className="green-text text-accent-4">
                Edit Profile
              </a>
            </li>
            <li className="tab col s3">
              <a href="#jobs" className="green-text text-accent-4">
                My Jobs ({job.count || 0})
              </a>
            </li>
            <li className="tab col s3">
              <a href="#messages" className="green-text text-accent-4">
                Messages ({inbox.inbox.length || 0})
              </a>
            </li>
          </ul>
        </div>
        <div id="edit-profile" className="col s12">
          <div className="container m-t-l" id="accountForm">
            <h2>Edit Profile</h2>
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
        </div>
        <div id="jobs" className="col s12">
          <div className="m-t-l">
            <h2>My Jobs</h2>
          </div>
        </div>
        <div id="messages" className="col s12">
          <div className="m-t-l">
            <h2>My Messages</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAccount;
