import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { StoreState } from '../../store/store';
import Job, { JobAttributes } from '../../store/job/jobInterface';
import { fetchJobs } from '../../store/job/jobActions';
import JobCard from './jobCard';
import { feedFilter } from '../../frontEndUtils';

const useStyles = makeStyles({
  button: {
    '&.active': {
      background: '#00c853',
      color: '#fffff',
    },
    color: '#00c853',
    margin: '10px 5px',
    background: '#ffffff',
  },
  search: {
    marginTop: '10px',
  },
});

interface Props {
  job: Job;
  fetchJobs: () => Job;
}

const Feed: React.FC<Props> = (props: Props) => {
  const [filter, setFilter] = useState('all');
  const [input, setInput] = useState('');

  useEffect(() => {
    props.fetchJobs();
  }, []);

  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setInput(e.target.value);

  const setAll = () => setFilter('all');
  const setPaid = () => setFilter('paid');
  const setUnpaid = () => setFilter('unpaid');
  const jobs = feedFilter(props.job.allJobs, filter, input);
  const classes = useStyles();
  return (
    <div className="container">
      <div className="feedContainer">
        <TextField
          className={classes.search}
          value={input}
          onChange={handleInput}
          fullWidth
          label="Search Jobs"
        />
        <div>
          <Button
            className={classes.button}
            value="all"
            variant={filter === 'all' ? 'contained' : 'outlined'}
            onClick={setAll}
          >
            All Jobs
          </Button>
          <Button
            className={classes.button}
            variant={filter === 'paid' ? 'contained' : 'outlined'}
            onClick={setPaid}
          >
            Paid Jobs
          </Button>
          <Button
            className={classes.button}
            variant={filter === 'unpaid' ? 'contained' : 'outlined'}
            onClick={setUnpaid}
          >
            Unpaid Jobs
          </Button>
        </div>
        {jobs.map((job: JobAttributes) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

const mapState = (state: StoreState) => {
  return {
    job: state.job,
    view: state.view,
  };
};
const mapDispatchToProps = { fetchJobs };

export default connect(mapState, mapDispatchToProps)(Feed);
