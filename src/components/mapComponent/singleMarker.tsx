/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { JobAttributes } from '../../store/job/jobInterface';

interface Props {
  lat: number;
  lng: number;
  text: string;
  job: JobAttributes;
}

const PAID_ICON =
  'https://treehugger-capstone.s3.us-east-2.amazonaws.com/PaidMapIcon.svg';

const VOLUNTEER_ICON =
  'https://treehugger-capstone.s3.us-east-2.amazonaws.com/VolunteerMapIcon.svg';

const SingleMarker: React.FC<Props> = (props: Props) => {
  return (
    <div className="marker">
      <img
        src={props.job.status === 'funded' ? PAID_ICON : VOLUNTEER_ICON}
        alt="icon"
        style={{ height: '30px', width: '30px' }}
      />
    </div>
  );
};

export default SingleMarker;
