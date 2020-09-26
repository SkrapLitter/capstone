import React, { useState } from 'react';
import { uploadVerification } from '../../store/photos/photoActions';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';

interface RouteParams {
  id: string;
}

const PhotoVerification: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const { id } = useParams<RouteParams>();

  const [photos, setPhotos] = useState([]);

  const submitImages = e => {
    e.preventDefault();
    const file = new FormData();
    photos.forEach(photo => {
      file.append('image', photo);
    });
    uploadVerification(file, id, history);
  };

  return (
    <div className="container">
      <DropzoneArea onChange={files => setPhotos(files)} />
      <Button variant="outlined" onClick={submitImages} className="m1em">
        Submit Verification
      </Button>
    </div>
  );
};

export default PhotoVerification;
