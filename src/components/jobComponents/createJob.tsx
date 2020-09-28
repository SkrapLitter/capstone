import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CreateAccountOverlay from '../userComponents/createAccountOverlay';
import { validate } from '../validation';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';
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

const CreateJob: React.FC = () => {
  const classes = useStyles();

  const selectUser = (state: StoreState) => state.user;
  const [photos, setPhotos] = useState([]);
  const user = useSelector(selectUser);
  const history = useHistory();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [shouldShowCreateUser, setShouldShowCreateUser] = useState(false);

  useEffect(() => {
    // if user is logged in - hide create account overlay
    if (user.clearance) setShouldShowCreateUser(false);
  }, [user.clearance]);

  useEffect(() => {
    // animate label for textarea to clone material-ui
    const textarea: HTMLElement = document.getElementById('description');
    const textareaLabel: HTMLElement = document.getElementById(
      'descriptionLabel'
    );
    if (textarea.textContent.length) {
      textareaLabel.classList.add('active');
    }
    textarea.addEventListener('focus', () => {
      textareaLabel.classList.add('active');
    });
    textarea.addEventListener('blur', () => {
      if (!textarea.textContent.length) {
        textareaLabel.classList.remove('active');
      }
    });
  }, [description]);

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    // validate form and highlight invalid fields
    if (!name || !description || !price || !address) {
      // TODO toast message
      return;
    }
    // check if user is logged in
    if (!user.clearance) {
      setShouldShowCreateUser(true);
      return;
    }
    const status: string =
      price.length && price !== '0' ? 'pending' : 'volunteer';
    const newJob = {
      name,
      price,
      address: JSON.stringify(address),
      description,
      userId: user.id,
      status,
    };
    const file = new FormData();
    photos.forEach(photo => {
      file.append('image', photo);
    });
    Object.keys(newJob).forEach(key => {
      file.append(key, newJob[key]);
    });
    axios
      .post('/api/jobs', file)
      .then(({ data }) => {
        // get jobId for navigation
        console.log(data);
        const id = data.id;
        if (status === 'volunteer') {
          // navigate to job details page
          history.push(`/jobs/${id}`);
        } else {
          history.push(`/checkout/${id}`);
        }
      })
      // TODO - error handling for server errors - Toast?
      .catch(console.log);
  };

  return (
    <div
      className="container"
      style={{ maxWidth: '400px', textAlign: 'center' }}
      id="createJobForm"
    >
      <h4>Create a New Job</h4>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Name"
          value={name}
          error={!!name.length && name.length < 4}
          onChange={e => setName(e.target.value)}
          aria-required
          required
          helperText={
            !!name.length && name.length < 4 ? 'Name is too short' : ''
          }
        />
        <TextField
          id="price"
          label="Price"
          value={price}
          error={!!price.length && !validate.isPrice(price)}
          onChange={e => setPrice(e.target.value)}
          aria-required
          required
          helperText={
            !!price.length && !validate.isPrice(price)
              ? 'Please enter a valid price'
              : ''
          }
        />
        <div className="m8">
          <p style={{ textAlign: 'left', color: 'rgba(0, 0, 0, 0.54)' }}>
            Location<span className="smallText"> *</span>
          </p>
          <GooglePlacesAutocomplete
            selectProps={{ address, onChange: setAddress }}
            apiKey="AIzaSyB3PsGI6ryopGrbeXMY1oO17jTp0ksQFoI"
          />
        </div>
        <div className="m-t-b">
          <DropzoneArea onChange={files => setPhotos(files)} />
        </div>
        <div className="m8 pRel">
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            id="description"
            autoComplete="off"
            className={
              description.length
                ? description.length > 3
                  ? 'createDescription valid'
                  : 'createDescription invalid'
                : 'createDescription'
            }
          />
          <label htmlFor="description" id="descriptionLabel">
            Description<span className="smallText"> *</span>
          </label>
        </div>
        <div className="center">
          <button
            onClick={handleSubmit}
            className="btn waves-effect waves-light green accent-4"
            type="submit"
          >
            Create Job
            <i className="material-icons right">work</i>
          </button>
        </div>
        {shouldShowCreateUser && <CreateAccountOverlay />}
      </form>
    </div>
  );
};

export default CreateJob;
