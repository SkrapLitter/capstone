/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import { JobAttributes } from '../../store/job/jobInterface';
import JobCard from '../feedComponent/jobCard';

const PAID_ICON =
  'https://treehugger-capstone.s3.us-east-2.amazonaws.com/PaidMapIcon.svg';

const VOLUNTEER_ICON =
  'https://treehugger-capstone.s3.us-east-2.amazonaws.com/VolunteerMapIcon.svg';

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
      <img
        src={job.status === 'funded' ? PAID_ICON : VOLUNTEER_ICON}
        onClick={handleChange}
        alt="icon"
        style={{ height: '30px', width: '30px' }}
      />
      <Dialog open={open} onClose={handleChange}>
        <JobCard job={job} />
      </Dialog>
    </div>
  );
};

export default MapMarker;
