import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { validate } from '../validation';
import { updateAccountThunk } from '../../store/user/userActions';
import JobsDetailsPreview from '../jobDetailsComponent/jobsDetailsPreview';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import AccountCircle from '@material-ui/icons/AccountCircle';

import M from 'materialize-css';

const EditAccount: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);

  const { jobs } = useSelector((state: StoreState) => state.job);

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
      input.classList.remove('Mui-disabled');
      input.parentElement.classList.remove('Mui-disabled');
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

      console.log(updatedUser);

      dispatch(updateAccountThunk(id, updatedUser));

      setDisabled('accountForm');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    // control form field value
    set(e.target.value);
  };
  return (
    <>
      <img
        src={user.image}
        width="75"
        height="75"
        className="border-circle z-depth-1"
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
                My Jobs ({jobs.length || 0})
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
                <TextField
                  id="firstName"
                  label="First Name"
                  disabled
                  defaultValue={firstName}
                  fullWidth
                  error={!validate.isName(firstName)}
                  onChange={e => handleChange(e, setFirstName)}
                  helperText={
                    !validate.isName(firstName) ? 'Invalid Field' : ' '
                  }
                />
              </div>
              <div className="col s1">
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={() => toggleDisabled('firstName')}
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col s11 input-field">
                <TextField
                  id="lastName"
                  label="Last Name"
                  disabled
                  defaultValue={lastName}
                  fullWidth
                  error={!validate.isName(lastName)}
                  onChange={e => handleChange(e, setLastName)}
                  helperText={
                    !validate.isName(lastName) ? 'Invalid Field' : ' '
                  }
                />
              </div>
              <div className="col s1">
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={() => toggleDisabled('lastName')}
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col s11 input-field">
                <TextField
                  id="email"
                  label="Email"
                  disabled
                  defaultValue={username}
                  fullWidth
                  error={!validate.isEmail(username)}
                  onChange={e => handleChange(e, setUsername)}
                  helperText={
                    !validate.isEmail(username) ? 'Invalid Field' : ' '
                  }
                />
              </div>
              <div className="col s1">
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  onClick={() => toggleDisabled('email')}
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="center">
              <Button
                variant="contained"
                size="large"
                color="primary"
                className="green accent-4"
                onClick={handleSubmit}
                startIcon={<AccountCircle />}
              >
                Update Account
              </Button>
            </div>
          </div>
        </div>
        <div id="jobs" className="col s12">
          <div className="m-t-l">
            <JobsDetailsPreview />
          </div>
        </div>
        <div id="messages" className="col s12">
          <div className="m-t-l">
            <h2>My Messages</h2>
            {inbox.inbox.length ? (
              <ul className="collection">
                {inbox.inbox.map(chatroom => (
                  <li key={chatroom.id} className="collection-item left-align">
                    <Link to={`/inbox/${chatroom.id}`}>{chatroom.name}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <h2>No Jobs Yet</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAccount;
