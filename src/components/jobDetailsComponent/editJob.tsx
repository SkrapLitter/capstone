import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { AppThunk } from '../../store/thunkType';
import {
  fetchJob,
  addPhotoToJob,
  deletePhotoFromJob,
} from '../../store/job/jobActions';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

interface RouteParams {
  id: string;
}

const EditJob: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);
  const dispatch: (a: AppThunk) => Promise<any> = useDispatch();
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const [name, setName] = useState('');
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
    return validFields.length === 2;
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
  const handleDeleteImage = (photoId: string, jobId: string) => {
    dispatch(deletePhotoFromJob(photoId, jobId));
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
        <p style={{ textAlign: 'left', color: 'gray' }}>Location</p>
        <GooglePlacesAutocomplete
          selectProps={{ address, onChange: setAddress }}
          apiKey="AIzaSyB3PsGI6ryopGrbeXMY1oO17jTp0ksQFoI"
        />
      </div>
      <div className="thumbGallery">
        {job &&
          job.images.map(img => (
            <div
              key={img.id}
              style={{ backgroundImage: `url('${img.url}')` }}
              className="thumb"
            >
              <DeleteForeverOutlinedIcon
                style={{ color: 'red' }}
                onClick={() => handleDeleteImage(img.id, job.id)}
              />
            </div>
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
