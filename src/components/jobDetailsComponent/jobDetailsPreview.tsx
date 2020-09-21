import React from 'react';
import { JobAttributes } from '../../store/job/jobInterface';
import { Link } from 'react-router-dom';

interface Props {
  job: JobAttributes;
}

const JobDetailsPreview: React.FC<Props> = (props: Props) => {
  const {
    job: { id, status, name, address, city, state },
  } = props;

  return (
    <li key={id} className="collection-item left-align">
      <h6>
        <span
          className="new badge green darken-1"
          data-badge-caption={status}
        />
        <strong>
          <Link to={id}>{name}</Link>
        </strong>
      </h6>
      <div>{address}</div>
      <div>
        {city}, {state}
      </div>
    </li>
  );
};

export default JobDetailsPreview;
