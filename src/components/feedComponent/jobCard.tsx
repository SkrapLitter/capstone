import React from 'react';
import { JobAttributes } from '../../store/job/jobInterface';
import { Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FeedImageRender from './feedImageRender';

const VOLUNTEER_ICON =
  'https://treehugger-capstone.s3.us-east-2.amazonaws.com/volunteerIcon.svg';

interface Props {
  job: JobAttributes;
}

const JobCard: React.FC<Props> = (props: Props) => {
  const { job } = props;
  const images: string[] = job.images.map(img => img.url);
  const history = useHistory();
  return (
    <Paper elevation={3} className="jobCard">
      <Grid container direction="column">
        <div className="flex jcc w100">
          <FeedImageRender images={images} />
        </div>
        <Grid item xs={12}>
          <div className="feedTextContainer">
            <p className="jobCardTitle">{job.name}</p>
            <div className="jobCardInfo">
              <div>
                {!props.job.price ? (
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <img
                      src={VOLUNTEER_ICON}
                      alt="volunteer icon"
                      className="volunteerIcon"
                    />
                    <h6 className="gray">&nbsp;This is a volunteer job</h6>
                  </div>
                ) : (
                  <div className="flex jobRow">
                    <AttachMoneyIcon color="primary" />
                    <h5>{job.price}</h5>
                  </div>
                )}
                <div className="flex jobRow">
                  <LocationOnIcon color="secondary" className="locationIcon" />
                  <h6 className="gray">
                    {job.address}, {job.city}, {job.state}
                  </h6>
                </div>
              </div>
              <div className="jobCardButtons">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push(`/jobs/${job.id}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JobCard;
