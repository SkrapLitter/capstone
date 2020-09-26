/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { Dialog, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';
import { JobAttributes } from '../../store/job/jobInterface';

interface Props {
  key: string;
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
  const { job } = props;

  const body = (
    <Paper>
      <div className="mapCard">
        <div key={job.images[0].id} className="mapImageContainer">
          <img className="mapCardImage" src={job.images[0].url} alt="trash" />
        </div>
        <div className="mapCardText">
          <div>
            <h4>{props.job.name}</h4>
            <h6>
              {props.job.address}, {props.job.city}, {props.job.state}
            </h6>
            <p>
              <i>"{props.job.summary}"</i>
            </p>
          </div>
          <div className="mapCardButtons">
            {props.job.price > 0 ? (
              <h4>
                <strong>${props.job.price}</strong>
              </h4>
            ) : (
              <p className="charcoal" style={{ fontSize: '1.2em' }}>
                Volunteer
              </p>
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
