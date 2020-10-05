import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { JobAttributes } from '../../store/job/jobInterface';
import { cancelJob, completeJob } from '../../store/job/jobActions';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';
import { StoreState } from '../../store/store';

interface Props {
  jobs: Array<JobAttributes>;
}

const JobDetailsPreview: React.FC<Props> = (props: Props) => {
  const { jobs } = props;
  const { user } = useSelector((state: StoreState) => state);
  const dispatch = useDispatch();

  const handleCancel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    job: JobAttributes
  ): void => {
    e.preventDefault();
    dispatch(cancelJob(job));
  };
  const handleComplete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    job: JobAttributes
  ): void => {
    e.preventDefault();
    dispatch(completeJob(job));
  };

  return (
    <Box>
      {jobs.length ? (
        <List>
          {jobs.map(job => (
            <ListItem key={job.id}>
              <ListItemIcon>
                <RoomIcon />
              </ListItemIcon>
              <ListItemText>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={10}>
                    <h6>
                      <span
                        className="new badge green darken-1"
                        data-badge-caption={job.status}
                      />
                      <strong>
                        <Link to={`/jobs/${job.id}`}>{job.name}</Link>
                      </strong>
                    </h6>
                    <div>{job.address}</div>
                    <div>
                      {job.city}, {job.state}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    {(job.status === 'funded' || job.status === 'volunteer') &&
                      !job.reserved && (
                        <Fab
                          size="small"
                          color="secondary"
                          aria-label="Cancel"
                          onClick={e => handleCancel(e, job)}
                        >
                          <CancelIcon />
                        </Fab>
                      )}
                    {job.status === 'pendingVerification' &&
                      job.userId === user.id && (
                        <Fab
                          size="small"
                          color="secondary"
                          aria-label="Complete"
                          onClick={e => handleComplete(e, job)}
                        >
                          <CheckCircleIcon />
                        </Fab>
                      )}
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box component="h3">No Jobs Yet</Box>
      )}
    </Box>
  );
};

export default JobDetailsPreview;
