/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import { JobAttributes } from '../../store/job/jobInterface';
import JobCard from '../feedComponent/jobCard';

interface Props {
  key: string;
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
  const { job } = props;

  return (
    <div className="marker">
      <i onClick={handleChange} className="material-icons" role="button">
        delete
      </i>
      <Dialog open={open} onClose={handleChange}>
        <JobCard job={job} />
      </Dialog>
    </div>
  );
};

export default MapMarker;
