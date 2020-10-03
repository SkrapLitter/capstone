import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { JobAttributes } from '../../store/job/jobInterface';
import { cancelJob } from '../../store/job/jobActions';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

interface Props {
  jobs: Array<JobAttributes>;
}

const JobDetailsPreview: React.FC<Props> = (props: Props) => {
  const { jobs } = props;
  const dispatch = useDispatch();

  const handleCancel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    job: JobAttributes
  ): void => {
    e.preventDefault();
    dispatch(cancelJob(job));
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
                        <Link to={job.id}>{job.name}</Link>
                      </strong>
                    </h6>
                    <div>{job.address}</div>
                    <div>
                      {job.city}, {job.state}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={e => handleCancel(e, job)}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box p={5}>No jobs yet</Box>
      )}
    </Box>
  );
};

export default JobDetailsPreview;
