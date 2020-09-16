import React from 'react';
import { JobAttributes } from '../../store/job/jobInterface';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Parallax } from 'react-parallax';

interface Props {
  job: JobAttributes;
}

const DesktopCard: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  return (
    <div className="col s12 m7">
      <div className="card horizontal">
        <div className="card-image jobImage">
          <Parallax strength={300} bgImage={props.job.images[0].url}>
            <div style={{ height: '200px', width: '200px' }} />
          </Parallax>
        </div>
        <div className="card-stacked">
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
                onClick={e => {
                  e.preventDefault();
                  history.push(`/jobs/${props.job.id}`);
                }}
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

export default DesktopCard;
