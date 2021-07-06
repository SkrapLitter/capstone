import React, { useState, useEffect } from 'react';
import { uploadVerification } from '../../store/photos/photoActions';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { StoreState } from '../../store/store';
import { Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJob } from '../../store/job/jobActions';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

interface RouteParams {
  id: string;
}

const PhotoVerification: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const { id } = useParams<RouteParams>();
  const dispatch = useDispatch();
  const {
    job: { job },
  } = useSelector((state: StoreState) => state);

  useEffect(() => {
    // scroll to top of window
    window.scroll(0, 0);
    // get the job details
    dispatch(fetchJob(id));
  }, []);

  const [photos, setPhotos] = useState([]);

  const submitImages = e => {
    e.preventDefault();
    const file = new FormData();
    photos.forEach(photo => {
      file.append('image', photo);
    });
    uploadVerification(file, id, history);
  };
  console.log('JOB', job);
  return (
    <div className="container">
      {job && job.user && (
        <div style={{ marginTop: '20px' }}>
          <div
            className="d-flex"
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <h2>Is {job.name} all cleaned up?</h2>
            <div>
              <img
                className="border-circle"
                src={job.images[0].url}
                alt="trash"
                style={{ height: '75px', width: '75px' }}
              />
            </div>
          </div>
          <div className="d-flex" style={{ alignItems: 'center' }}>
            <PhotoCameraIcon color="secondary" />
            &nbsp;
            <h4>
              Upload a few photos to let {job.user.firstName} know the job is
              complete!
            </h4>
          </div>
          <DropzoneArea onChange={files => setPhotos(files)} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" onClick={submitImages} className="m1em">
              Submit Verification
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoVerification;
