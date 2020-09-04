import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { fetchJob } from '../../store/job/jobActions';
import { RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { findOrCreateChat } from '../../store/inbox/inboxActions';
import { Chatroom } from '../../store/inbox/inboxInterface';

type TParams = { id: string };
const JobDetails: React.FC<RouteComponentProps<TParams>> = ({
  match,
}: RouteComponentProps<TParams>) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJob(id));
  }, []);
  const {
    user,
    job: { job },
  } = useSelector((state: StoreState) => state);
  const history = useHistory();
  const openChat = e => {
    e.preventDefault();
    return new Promise((res, rej) => {
      try {
        res(
          dispatch(
            findOrCreateChat(
              user.id,
              job.userId,
              user.username,
              job.createdUser,
              job.id,
              job.name
            )
          )
        );
      } catch (err) {
        rej(err);
      }
    }).then((res: Chatroom) => {
      if (res) {
        history.push(`/inbox/${res.id}`);
      }
    });
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
