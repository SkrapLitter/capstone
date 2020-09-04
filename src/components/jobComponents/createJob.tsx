import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CreateAccountOverlay from '../userComponents/createAccountOverlay';

const CreateJob: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);
  const history = useHistory();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [shouldShowCreateUser, setShouldShowCreateUser] = useState(false);

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
    // if user is logged in - hide create account overlay
    if (user.clearance) setShouldShowCreateUser(false);
  }, [user.clearance]);

  const isValid = (): boolean => {
    const form = document.getElementById('createJobForm');
    const validFields = form.querySelectorAll('.valid');
    // 2 inputs + textarea are valid and address object returned from Google
    return validFields.length === 3 && !!address;
  };

  const handleSubmit = (): void => {
    // validate form and highlight invalid fields
    if (!isValid()) {
      const form = document.getElementById('createJobForm');
      const inputs = form.querySelectorAll('input');
      const textarea = form.querySelector('textarea');
      inputs.forEach(input => {
        if (!input.classList.contains('valid')) {
          input.classList.add('invalid');
        }
      });
      if (!textarea.classList.contains('valid')) {
        textarea.classList.add('invalid');
      }
      return;
    }
    // check if user is logged in
    if (!user.clearance) {
      setShouldShowCreateUser(true);
      return;
    }
    // form is valid and user is logged in
    // submit form
    axios
      .post('/api/jobs', {
        name,
        price,
        address,
        description,
        userId: user.id,
      })
      .then(({ data }) => {
        // get jobId for navigation
        const id = data.jobId;
        // navigate to job details page
        history.push(`/jobs/${id}`);
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
      <h4>Create New Job</h4>
      <div className="input-field fsField">
        <input
          value={name}
          onChange={e => handleChange(e, setName, 'nameLabel')}
          id="name"
          autoComplete="off"
          className={name.length ? (name.length > 3 ? 'valid' : 'invalid') : ''}
        />
        <label htmlFor="name" id="nameLabel">
          Job Name
        </label>
      </div>
      <div className="input-field fsField">
        <input
          value={price}
          onChange={e => handleChange(e, setPrice, 'priceLabel')}
          id="price"
          autoComplete="off"
          className={
            price.length ? (/^[0-9]+$/.test(price) ? 'valid' : 'invalid') : ''
          }
        />
        <label htmlFor="price" id="priceLabel">
          Price
        </label>
      </div>
      <div className="input-field fsField">
        <p style={{ textAlign: 'left', color: 'gray' }}>Location</p>
        <GooglePlacesAutocomplete
          selectProps={{ address, onChange: setAddress }}
          apiKey="AIzaSyB3PsGI6ryopGrbeXMY1oO17jTp0ksQFoI"
        />
      </div>
      <div className="input-field fsField">
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
          Description
        </label>
      </div>
      <div className="center">
        <button
          onClick={handleSubmit}
          className="btn waves-effect waves-light green accent-4"
          type="submit"
        >
          Create Job
          <i className="material-icons right">account_circle</i>
        </button>
      </div>
      {shouldShowCreateUser && <CreateAccountOverlay />}
    </div>
  );
};

export default CreateJob;
