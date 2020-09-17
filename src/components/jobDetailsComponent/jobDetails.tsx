import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import GoogleMapReact from 'google-map-react';
import { StoreState } from '../../store/store';
import { fetchJob } from '../../store/job/jobActions';
import UserButtons from './userButtons';
import PosterButtons from './posterButtons';
import SingleMarker from '../mapComponent/singleMarker';
import JobImages from './jobImages';

interface RouteParams {
  id: string;
}

const JobDetails: React.FC = () => {
  const zoom = 16;
  const dispatch: (
    a: ThunkAction<any, any, any, any>
  ) => Promise<any> = useDispatch();
  const { id } = useParams<RouteParams>();
  useEffect(() => {
    dispatch(fetchJob(id));
  }, []);

  const {
    user,
    job: { job },
  } = useSelector((state: StoreState) => state);

  const renderButtons = () => {
    return job.userId === user.id ? <PosterButtons /> : <UserButtons />;
  };

  return (
    <div className="container jCenter">
      {job && Object.values(job).length ? (
        <>
          <h4 className="center-align">{job.name}</h4>
          <div className="jCenter" style={{ maxWidth: '800px' }}>
            <JobImages />
            {renderButtons()}
            <div className="container">
              <div className="flexRow">
                <div className="flexRow">
                  <h6 className="charcoal">Posted By: {job.createdUser}</h6>
                  <img
                    src={job.user && job.user.image}
                    width="50"
                    height="50"
                    className="border-circle z-depth-1"
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                </div>
                <h4 id="jobPrice">
                  {job.price > 0 ? `$${job.price}` : 'Volunteer'}
                </h4>
              </div>
              <p>{job.description}</p>
            </div>
          </div>
          <div className="jCenter" style={{ textAlign: 'left' }}>
            <p className="charcoal">
              Location: {job.address}, {job.city}
            </p>
            <div className="mapContainerSmall">
              {!!job.lat && (
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: 'AIzaSyB3PsGI6ryopGrbeXMY1oO17jTp0ksQFoI',
                  }}
                  center={{ lat: job.lat, lng: job.lng }}
                  zoom={zoom}
                >
                  <SingleMarker lat={job.lat} lng={job.lng} text={job.name} />
                </GoogleMapReact>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default JobDetails;
