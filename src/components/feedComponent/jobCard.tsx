import React from 'react';
import { JobAttributes } from '../../store/job/jobInterface';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Parallax } from 'react-parallax';

const VOLUNTEER_ICON =
  'https://treehugger-capstone.s3.us-east-2.amazonaws.com/volunteerIcon.svg';

interface Props {
  job: JobAttributes;
}

const JobCard: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  return (
    <Paper elevation={3} className="jobCard">
      <Grid container direction="row">
        <Grid item xs={12} sm={6} lg={6} md={6}>
          <div className="feedJobImage">
            <Parallax strength={300} bgImage={props.job.images[0].url}>
              <div style={{ height: '300px' }} />
            </Parallax>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={6} md={6}>
          <div className="feedTextContainer">
            <div>
              <h4>{props.job.name}</h4>
              <h6 className="charcoal">
                {props.job.address}, {props.job.city}, {props.job.state}
              </h6>
            </div>
            <div>
              <div>
                {props.job.price === 0 ? (
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <img
                      src={VOLUNTEER_ICON}
                      alt="volunteer icon"
                      className="volunteerIcon"
                    />
                    <h6>
                      <i>This is a volunteer job</i>
                    </h6>
                  </div>
                ) : (
                  <h3>
                    <strong>${props.job.price}</strong>
                  </h3>
                )}
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JobCard;
