import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const CreateJob: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const setters: React.Dispatch<React.SetStateAction<string>>[] = [
    setName,
    setPrice,
    setAddress,
    setDescription,
  ];

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

  const handleSubmit = () => {
    axios
      .post('/api/jobs', {
        name,
        price,
        address,
        description,
        userId: user.id,
      })
      .then(() => {
        setters.forEach(fn => fn(''));
      })
      .catch(console.log);
  };
  console.log('ADDRESS', address);
  return (
    <div
      className="container"
      style={{ maxWidth: '400px', textAlign: 'center' }}
    >
      <h4>Create New Job</h4>
      <div className="input-field fsField">
        <input
          value={name}
          onChange={e => handleChange(e, setName, 'nameLabel')}
          id="name"
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
          className="createDescription"
          value={description}
          onChange={e => setDescription(e.target.value)}
          id="description"
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
    </div>
  );
};

export default CreateJob;
