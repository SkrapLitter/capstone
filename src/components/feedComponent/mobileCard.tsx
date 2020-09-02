import React from 'react';
import { JobAttributes } from '../../store/job/jobInterface';

interface Props {
  job: JobAttributes;
}

const MobileCard: React.FC<Props> = (props: Props) => {
  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
            <img src={props.job.image} alt="trash" />
          </div>
          <div className="card-content">
            <h5>{props.job.name}</h5>
            <h6>
              {props.job.city}, {props.job.state}
            </h6>
            <p>{props.job.description}</p>
            <p>
              {props.job.price === 0 ? (
                <strong>This job is unpaid</strong>
              ) : (
                <strong>${props.job.price}</strong>
              )}
            </p>
            <div>
              <button
                className="waves-effect waves-light btn green accent-4 cardButton"
                type="button"
              >
                View Details
              </button>
              <button
                className="waves-effect waves-light btn green accent-4 cardButton"
                type="button"
              >
                Reserve Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;
