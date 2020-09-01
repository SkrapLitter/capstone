/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import { JobAttributes } from '../../store/job/jobInterface';

const DEFAULT_TRASH_URL =
  'https://prc.org/app/uploads/2019/01/Single-Stream-1024x768.jpg';

interface Props {
  lat: number;
  lng: number;
  text: string;
  job: JobAttributes;
}

const MapMarker: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setOpen(!open);
  };

  const body = (
    <div className="row mapModal">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
            <img src={DEFAULT_TRASH_URL} alt="trash" />
            <span className="card-title">{props.job.name}</span>
          </div>
          <div className="card-content">
            <p>
              {props.job.address} {props.job.city}
            </p>
            <p>{props.job.price}</p>
          </div>
          <div className="card-action">
            <a href="/">View Details</a>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="marker">
      <i onClick={handleChange} className="material-icons" role="button">
        delete
      </i>
      <Modal open={open} onClose={handleChange}>
        {body}
      </Modal>
    </div>
  );
};

export default MapMarker;
