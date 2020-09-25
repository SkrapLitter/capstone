import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../../store/job/jobActions';
import { StoreState } from '../../store/store';
import JobDetailsPreview from './jobDetailsPreview';

const jobsDetailsPreview: React.FC = () => {
  const { jobs } = useSelector((state: StoreState) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  return (
    <div id="jobs" className="col s12">
      <div className="m-t-l">
        <h3>My Jobs</h3>
        {jobs.length ? (
          <ul className="collection">
            {jobs.map(job => (
              <JobDetailsPreview key={job.id} job={job} />
            ))}
          </ul>
        ) : (
          <h2> No Jobs Yet</h2>
        )}
      </div>
    </div>
  );
};

export default jobsDetailsPreview;
