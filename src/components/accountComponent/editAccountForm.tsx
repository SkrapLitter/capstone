import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { validate } from '../validation';
import { updateAccountThunk } from '../../store/user/userActions';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircle from '@material-ui/icons/AccountCircle';

const EditAccountForm: React.FC = () => {
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

      dispatch(updateAccountThunk(id, updatedUser));
      setDisabled('accountForm');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    set: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    // control form field value
    set(e.target.value);
  };
  return (
    <div id="accountForm">
      <Box py={5}>
        <Grid container spacing={3}>
          <Grid item xs={11}>
            <TextField
              id="firstName"
              label="First Name"
              disabled
              defaultValue={firstName}
              fullWidth
              error={!validate.isName(firstName)}
              onChange={e => handleChange(e, setFirstName)}
              helperText={!validate.isName(firstName) ? 'Invalid Field' : ' '}
            />
          </Grid>
          <Grid item xs={1}>
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              onClick={() => toggleDisabled('firstName')}
            >
              <EditIcon />
            </Fab>
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="lastName"
              label="Last Name"
              disabled
              defaultValue={lastName}
              fullWidth
              error={!validate.isName(lastName)}
              onChange={e => handleChange(e, setLastName)}
              helperText={!validate.isName(lastName) ? 'Invalid Field' : ' '}
            />
          </Grid>
          <Grid item xs={1}>
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              onClick={() => toggleDisabled('lastName')}
            >
              <EditIcon />
            </Fab>
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="email"
              label="Email"
              disabled
              defaultValue={username}
              fullWidth
              error={!validate.isEmail(username)}
              onChange={e => handleChange(e, setUsername)}
              helperText={!validate.isEmail(username) ? 'Invalid Field' : ' '}
            />
          </Grid>
          <Grid item xs={1}>
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              onClick={() => toggleDisabled('email')}
            >
              <EditIcon />
            </Fab>
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
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
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EditAccountForm;
