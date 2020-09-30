import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobsByUser } from '../../store/job/jobActions';
import { StoreState } from '../../store/store';
import JobDetailsPreview from './jobDetailsPreview';
import Box from '@material-ui/core/Box';

const jobsDetailsPreview: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);

  const selectJobs = (state: StoreState) => state.job;
  const {
    userJobs: { active, cancelled, completed, pending, pendingVerification },
  } = useSelector(selectJobs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobsByUser(user.id));
  }, []);

  return (
    <div id="jobs" className="col s12">
      <div className="m-t-l">
        {active.length ? (
          <>
            <h3>Active Jobs</h3>
            <ul className="collection">
              {active.map(job => (
                <JobDetailsPreview key={job.id} job={job} />
              ))}
            </ul>
          </>
        ) : (
          <Box m={1} p={1}>
            No Active Jobs
          </Box>
        )}

        {cancelled.length ? (
          <>
            <h3>Active Jobs</h3>
            <ul className="collection">
              {cancelled.map(job => (
                <JobDetailsPreview key={job.id} job={job} />
              ))}
            </ul>
          </>
        ) : (
          <Box m={1} p={1}>
            No Cancelled Jobs
          </Box>
        )}

        {completed.length ? (
          <>
            <h3>Active Jobs</h3>
            <ul className="collection">
              {completed.map(job => (
                <JobDetailsPreview key={job.id} job={job} />
              ))}
            </ul>
          </>
        ) : (
          <Box m={1} p={1}>
            No Completed Jobs
          </Box>
        )}

        {pending.length ? (
          <>
            <h3>Active Jobs</h3>
            <ul className="collection">
              {pending.map(job => (
                <JobDetailsPreview key={job.id} job={job} />
              ))}
            </ul>
          </>
        ) : (
          <Box m={1} p={1}>
            No Pending Jobs
          </Box>
        )}

        {pendingVerification.length ? (
          <>
            <h3>Active Jobs</h3>
            <ul className="collection">
              {pendingVerification.map(job => (
                <JobDetailsPreview key={job.id} job={job} />
              ))}
            </ul>
          </>
        ) : (
          <Box m={1} p={1}>
            No Pending for Verification Jobs
          </Box>
        )}
      </div>
    </div>
  );
};

export default jobsDetailsPreview;
