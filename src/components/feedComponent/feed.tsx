import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { StoreState } from '../../store/store';
import { fetchJobs } from '../../store/job/jobActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import JobCard from './jobCard';

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

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const { jobs, count } = useSelector((state: StoreState) => state.job);
  const [type, setType] = useState('');
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  useEffect(() => {
    dispatch(fetchJobs());
  }, []);
  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setInput(e.target.value);
  const handleType = (e, filter: string) => {
    e.preventDefault();
    setPage(1);
    setSize(20);
    dispatch(fetchJobs(input, page, size, filter));
    setType(filter);
  };
  const fetchNext = () => {
    setPage(page + 1);
    setSize(size + 20);
    dispatch(fetchJobs(input, page, size, type));
  };
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
          onKeyPress={e => {
            if (e.key === 'Enter') {
              setPage(1);
              setSize(20);
              dispatch(fetchJobs(input, page, size, type));
            }
          }}
        />
        <div>
          <Button
            className={classes.button}
            variant={type === '' ? 'contained' : 'outlined'}
            onClick={e => handleType(e, '')}
          >
            All Jobs
          </Button>
          <Button
            className={classes.button}
            variant={type === 'paid' ? 'contained' : 'outlined'}
            onClick={e => handleType(e, 'paid')}
          >
            Paid Jobs
          </Button>
          <Button
            className={classes.button}
            variant={type === 'unpaid' ? 'contained' : 'outlined'}
            onClick={e => handleType(e, 'unpaid')}
          >
            Unpaid Jobs
          </Button>
        </div>
        <InfiniteScroll
          dataLength={count}
          next={fetchNext}
          hasMore={size < count}
          loader={<h4>Loading...</h4>}
        >
          {jobs.length ? (
            jobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <h2> No Jobs Yet</h2>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Feed;
