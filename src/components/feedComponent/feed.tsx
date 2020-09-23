import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
import MapIcon from '@material-ui/icons/Map';
import { StoreState } from '../../store/store';
import { fetchJobs, locationSort } from '../../store/job/jobActions';
import { JobAttributes } from '../../store/job/jobInterface';
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
  createButton: {
    color: '#ffffff',
    backgroundColor: '#00c853',
  },
});

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state: StoreState) => state.job);
  const { count } = useSelector((state: StoreState) => state.job);
  const [type, setType] = useState('');
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [location, setLocation] = useState(null);
  const [locSort, setLocSort] = useState(false);

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
    setSize(size + 20);
    dispatch(fetchJobs(input, page, size, type));
  };
  useEffect(() => {
    const success = ({ coords }) => {
      const localCoord = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      setLocation(localCoord);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const sortByLocation = () => {
    dispatch(locationSort(jobs, location, !locSort));
    setLocSort(!locSort);
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
        <div className="feedButtons">
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
              variant={type === 'funded' ? 'contained' : 'outlined'}
              onClick={e => handleType(e, 'funded')}
            >
              Paid Jobs
            </Button>
            <Button
              className={classes.button}
              variant={type === 'volunteer' ? 'contained' : 'outlined'}
              onClick={e => handleType(e, 'volunteer')}
            >
              Volunteer Jobs
            </Button>
          </div>

          {location ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {locSort ? (
                <h6>Location Sorting On</h6>
              ) : (
                <h6>Location Sorting Off</h6>
              )}
              <MapIcon
                fontSize="large"
                className="sortIcon"
                onClick={sortByLocation}
              />
            </div>
          ) : null}
        </div>
        <InfiniteScroll
          dataLength={count}
          next={fetchNext}
          hasMore={size < count}
          loader={<h4>Loading...</h4>}
          className="infiniteContainer"
        >
          {jobs.length ? (
            jobs.map((job: JobAttributes) => <JobCard key={job.id} job={job} />)
          ) : (
            <h2> No Jobs Yet</h2>
          )}
        </InfiniteScroll>
      </div>
      <div className="createButtonContainer">
        <Link to="/create">
          <Fab className={classes.createButton}>
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </div>
  );
};

export default Feed;
