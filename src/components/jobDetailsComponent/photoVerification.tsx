import React from 'react';
import { JobAttributes } from '../../store/job/jobInterface';
import axios from 'axios';

interface Props {
  job: JobAttributes;
}

const PhotoVerification: React.FC<Props> = (props: Props) => {
  const { job } = props;

  const handleImage = e => {
    e.preventDefault();
    const file = new FormData();
    file.append('image', e.target.files[0]);
    axios
      .post(`/api/photo/verificationphoto/${job.id}`, file, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=boundary',
        },
      })
      .then(({ data }) => console.log(data));
    // TODO - have jobDetails listen on changes for job.verifications.length,
    // display verification photos with verification star in corner
  };

  return (
    <div className="input-field fsField">
      <input type="file" name="image" id="imageUpload" onChange={handleImage} />
    </div>
  );
};

export default PhotoVerification;
