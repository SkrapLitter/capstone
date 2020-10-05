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
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

interface RouteParams {
  id: string;
}

const VOLUNTEER_ICON =
  'https://treehugger-capstone.s3.us-east-2.amazonaws.com/volunteerIcon.svg';

const JobDetails: React.FC = () => {
  const zoom = 16;

  const [showGallery, setShowGallery] = useState(false);

  const [showVerificationGallery, setShowVerificationGallery] = useState(false);
  // const [showVerUpload, setShowVerUpload] = useState(false);

  const dispatch: (a: AppThunk) => Promise<any> = useDispatch();
  const { id } = useParams<RouteParams>();
  useEffect(() => {
    // scroll to top of window
    window.scroll(0, 0);
    // get the job details
    dispatch(fetchJob(id));
  }, []);
  const {
    user,
    job: { job },
  } = useSelector((state: StoreState) => state);
  const renderButtons = () => {
    return job.userId === user.id ? <PosterButtons /> : <UserButtons />;
  };
  const images =
    job.images && job.images.length ? job.images.map(img => img.url) : [];
  return (
    <div className="container jCenter">
      {job && Object.values(job).length ? (
        <>
          <h2 className="center-align fredoka">{job.name}</h2>
          <div className="jCenter">
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
            <div style={{ display: 'flex' }}>{renderButtons()}</div>
            {job.verifications && job.verifications.length ? (
              <div className="container verificationContainer jCenter">
                <div>
                  <img
                    className="border-circle"
                    src={job.verifications[0].user.image}
                    alt="trash"
                    style={{
                      height: '75px',
                      width: '75px',
                      border: '1px solid grey',
                    }}
                  />
                </div>
                <div className="validationImageContainer">
                  <div className="validationPoint" />
                  <div
                    className="validationImage"
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
                <div className="d-flex" style={{ alignItems: 'center' }}>
                  <VerifiedUserIcon color="secondary" />
                  &nbsp;
                  <p
                    style={{
                      marginBlockStart: '0',
                      marginBlockEnd: '0',
                      fontSize: '1.3em',
                    }}
                  >
                    This job was cleaned by{' '}
                    {job.verifications[0].user.firstName}{' '}
                    {job.verifications[0].user.lastName}
                  </p>
                </div>
              </div>
            ) : null}
            <div className="jobDetailsContainer">
              <div>
                <div className="iconRow">
                  {Number(job.price) === 0 ? (
                    <img
                      src={VOLUNTEER_ICON}
                      alt="volunteer icon"
                      className="volunteerIcon"
                    />
                  ) : (
                    <AttachMoneyIcon color="primary" />
                  )}
                  <h4 id="jobPrice">
                    {job.price > 0 ? `${job.price}` : 'Volunteer'}
                  </h4>
                </div>
                <div className="iconRow">
                  <img
                    src={job.user && job.user.image}
                    width="24"
                    height="24"
                    className="border-circle z-depth-1"
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <p className="gray">Posted By: {job.createdUser}</p>
                </div>
              </div>
              <p>{job.description}</p>
              <div className="iconRow">
                <LocationOnIcon style={{ color: 'var(--blue)' }} />
                <p className="gray">
                  Location: {job.address}, {job.city}
                </p>
              </div>
            </div>
          </div>
          <div className="mapContainerSmall">
            {!!job.lat && (
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyB3PsGI6ryopGrbeXMY1oO17jTp0ksQFoI',
                }}
                center={{ lat: job.lat, lng: job.lng }}
                zoom={zoom}
              >
                <SingleMarker
                  lat={job.lat}
                  lng={job.lng}
                  text={job.name}
                  job={job}
                />
              </GoogleMapReact>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default JobDetails;
