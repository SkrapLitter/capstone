import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { fetchJob, addPhotoToJob } from '../../store/job/jobActions';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

interface RouteParams {
  id: string;
}

const EditJob: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const storeImages = (state: StoreState) => state.photos;
  const images = useSelector(storeImages);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState('');

  const {
    job: { job },
  } = useSelector((state: StoreState) => state);

  useEffect(() => {
    dispatch(fetchJob(id));
  }, []);

  useEffect(() => {
    console.log('JOB', job);
    setName(job.name);
    setPrice(job.price.toString());
    setDescription(job.description);
  }, [job]);

  useEffect(() => {
    console.log(address);
  }, [address]);

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
    const form = document.getElementById('createJobForm');
    const validFields = form.querySelectorAll('.valid');
    // 2 inputs + textarea are valid and address object returned from Google
    return validFields.length === 3;
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
    axios
      .put(`/api/jobs/${id}`, {
        name,
        price,
        address,
        description,
        userId: user.id,
        type: 'update',
      })
      .then(({ data }) => {
        // navigate to job details page
        history.push(`/jobs/${data.job.id}`);
      })
      // TODO - error handling for server errors - Toast?
      .catch(console.log);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = new FormData();
    file.append('image', e.target.files[0]);
    dispatch(addPhotoToJob(id, file));
  };

  return (
    <div
      className="container"
      style={{ maxWidth: '400px', textAlign: 'center' }}
      id="createJobForm"
    >
      <h4>Edit {name}</h4>
      <div className="input-field fsField">
        <input
          value={name}
          onChange={e => handleChange(e, setName, 'nameLabel')}
          id="name"
          autoComplete="off"
          className={name.length ? (name.length > 3 ? 'valid' : 'invalid') : ''}
        />
        <label htmlFor="name" id="nameLabel" className={name ? 'active' : ''}>
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
            price.length
              ? /^[0-9]+(\.[0-9]{2})?$/.test(price)
                ? 'valid'
                : 'invalid'
              : ''
          }
        />
        <label
          htmlFor="price"
          id="priceLabel"
          className={price ? 'active' : ''}
        >
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
      <div className="thumbGallery">
        {job &&
          job.images.map((img, i) => (
            <div
              key={img.url.slice(i)}
              style={{ backgroundImage: `url('${img.url}')` }}
              className="thumb"
            />
          ))}
      </div>
      <div className="m-t-b">
        <div className="input-field fsField">
          <input
            type="file"
            name="image"
            id="imageUpload"
            onChange={handleImage}
          />
        </div>
        <div>
          {images.photos.length
            ? images.photos.map(image => {
                return (
                  <img
                    key={image.id}
                    className="thumbnail"
                    src={image.url}
                    alt="trash"
                  />
                );
              })
            : null}
        </div>
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
        <label
          htmlFor="description"
          id="descriptionLabel"
          className={description ? 'active' : ''}
        >
          Description
        </label>
      </div>
      <div className="center">
        <button
          onClick={handleSubmit}
          className="btn waves-effect waves-light green accent-4"
          type="submit"
        >
          Submit
          <i className="material-icons right">work</i>
        </button>
      </div>
    </div>
  );
};

export default EditJob;
