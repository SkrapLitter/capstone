import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { fetchJob } from '../../store/job/jobActions';
import { Button } from '@material-ui/core';

const JobDetails: React.FC = (props: any) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJob(id));
  }, []);
  const {
    user,
    job: { job },
  } = useSelector((state: StoreState) => state);
  console.log(user, job);
  const openChat = e => {
    e.preventDefault();
    console.log(user.id, job ? job : job.userId);
  };
  return (
    <div>
      {job && Object.values(job).length ? (
        <>
          <h1>Job Details Page</h1>
          <p>{job.createdUser}</p>
          <Button onClick={openChat}> Message Poster</Button>
        </>
      ) : (
        <h2>No Job Selected Yet</h2>
      )}
    </div>
  );
};

export default JobDetails;
