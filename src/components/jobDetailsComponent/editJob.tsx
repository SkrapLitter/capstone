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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

interface RouteParams {
  id: string;
}

const EditJob: React.FC = () => {
  const classes = useStyles();

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
    if (!name || !description) {
      // TODO TOAST MESSAGE
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

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const file = new FormData();
    file.append('image', e.target.files[0]);
    dispatch(addPhotoToJob(id, file));
  };
  const handleDeleteImage = (photoId: string, jobId: string): void => {
    dispatch(deletePhotoFromJob(photoId, jobId));
  };
  return (
    <div
      className="container"
      style={{ maxWidth: '400px', textAlign: 'center' }}
      id="createJobForm"
    >
      <h2 className="fredoka">Edit {name}</h2>
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
        <div className="m8">
          <p
            style={{
              textAlign: 'left',
              fontSize: '0.8em',
              color: 'rgba(0, 0, 0, 0.54)',
            }}
          >
            Location<span className="smallText"> *</span>
          </p>
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
          <div>
            <input
              type="file"
              name="image"
              id="imageUpload"
              onChange={handleImage}
            />
          </div>
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
          <label
            htmlFor="description"
            id="descriptionLabel"
            className={description ? 'active' : ''}
          >
            Description
          </label>
        </div>
        <Button
          onClick={handleSubmit}
          className="btn waves-effect waves-light green accent-4"
          type="submit"
          variant="contained"
          color="primary"
        >
          <i className="material-icons mr05">work</i>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditJob;
