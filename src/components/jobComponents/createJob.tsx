import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import axios from 'axios';

const CreateJob: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const setters: React.Dispatch<React.SetStateAction<string>>[] = [
    setName,
    setPrice,
    setCity,
    setState,
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
        city,
        state,
        address,
        description,
        userId: user.id,
      })
      .then(() => {
        setters.forEach(fn => fn(''));
      })
      .catch(console.log);
  };

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
        <input
          value={address}
          onChange={e => handleChange(e, setAddress, 'addressLabel')}
          id="address"
        />
        <label htmlFor="address" id="addressLabel">
          Street Address
        </label>
      </div>
      <div className="input-field fsField">
        <input
          value={city}
          onChange={e => handleChange(e, setCity, 'cityLabel')}
          id="city"
        />
        <label htmlFor="city" id="cityLabel">
          City
        </label>
      </div>
      <div className="input-field fsField">
        <input
          value={state}
          onChange={e => handleChange(e, setState, 'stateLabel')}
          id="state"
        />
        <label htmlFor="state" id="stateLabel">
          State
        </label>
      </div>
      <div className="input-field fsField">
        <textarea
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
