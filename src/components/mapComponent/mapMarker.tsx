/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { Dialog, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';
import Carousel from 're-carousel';
import { JobAttributes } from '../../store/job/jobInterface';

interface Props {
  lat: number;
  lng: number;
  text: string;
  job: JobAttributes;
}

const MapMarker: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const handleChange = () => {
    setOpen(!open);
  };
  const body = (
    <Paper>
      <div className="mapCard">
        <Carousel>
          {props.job.images.map(image => (
            <div key={image.id} className="mapImageContainer">
              <img className="mapCardImage" src={image.url} alt="trash" />
            </div>
          ))}
        </Carousel>
        <div className="mapCardText">
          <div>
            <h4>{props.job.name}</h4>
            <h6>
              {props.job.address}, {props.job.city}, {props.job.state}
            </h6>
            <p>
              <i>"{props.job.description}"</i>
            </p>
          </div>
          <div className="mapCardButtons">
            {props.job.price > 0 ? (
              <h4>
                <strong>${props.job.price}</strong>
              </h4>
            ) : (
              <h6>
                <i>This job is unpaid</i>
              </h6>
            )}
            <button
              className="waves-effect waves-light btn green accent-4 cardButton"
              type="button"
              onClick={() => history.push(`/jobs/${props.job.id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </Paper>
  );
  return (
    <div className="marker">
      <i onClick={handleChange} className="material-icons" role="button">
        delete
      </i>
      <Dialog open={open} onClose={handleChange}>
        {body}
      </Dialog>
    </div>
  );
};

export default MapMarker;
