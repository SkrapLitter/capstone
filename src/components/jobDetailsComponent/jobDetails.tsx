/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppThunk } from '../../store/thunkType';
import GoogleMapReact from 'google-map-react';
import { StoreState } from '../../store/store';
import { fetchJob } from '../../store/job/jobActions';
import UserButtons from './userButtons';
import PosterButtons from './posterButtons';
import SingleMarker from '../mapComponent/singleMarker';
import JobImages from './jobImages';
// import PhotoVerification from './photoVerification';
import { Button } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

interface RouteParams {
  id: string;
}

const JobDetails: React.FC = () => {
  const zoom = 16;

  const [showGallery, setShowGallery] = useState(false);
  const [showVerificationGallery, setShowVerificationGallery] = useState(false);
  const [showVerUpload, setShowVerUpload] = useState(false);

  const dispatch: (a: AppThunk) => Promise<any> = useDispatch();
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
  const images = job.images.map(img => img.url);

  const toggleVerificationUpload = e => {
    e.preventDefault();
    setShowVerUpload(!showVerUpload);
  };
  return (
    <div className="container jCenter">
      {job && Object.values(job).length ? (
        <>
          <h4 className="center-align">{job.name}</h4>
          <div className="jCenter" style={{ maxWidth: '800px' }}>
            <div
              className="jobImage"
              style={{
                backgroundImage: `url('${
                  job.images && job.images.length && job.images[0].url
                }')`,
              }}
              onClick={() => setShowGallery(true)}
              role="navigation"
            />
            {showGallery && (
              <JobImages setShowGallery={setShowGallery} images={images} />
            )}
            <div style={{ display: 'flex' }}>
              {renderButtons()}
              {job.reservedUser === user.id ? (
                <Button
                  variant="outlined"
                  onClick={toggleVerificationUpload}
                  className="m1em"
                >
                  Job Complete?
                </Button>
              ) : null}
            </div>
            {job.verifications && job.verifications.length ? (
              <div className="container">
                <div className="d-flex" style={{ alignItems: 'center' }}>
                  <p style={{ fontSize: '1.5rem' }}>Verification</p>
                  <VerifiedUserIcon fontSize="large" />
                </div>
                <div className="verificationContainer f-centered">
                  <div
                    className="jobImage"
                    style={{
                      backgroundImage: `url('${
                        job.verifications &&
                        job.verifications.length &&
                        job.verifications[0].url
                      }')`,
                    }}
                    onClick={() => setShowVerificationGallery(true)}
                    role="navigation"
                  />
                  {showVerificationGallery && (
                    <JobImages
                      setShowGallery={setShowVerificationGallery}
                      images={job.verifications.map(img => img.url)}
                    />
                  )}
                </div>
              </div>
            ) : null}
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
