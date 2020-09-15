import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../../store/store';
import { fetchJob, reserveJob, unreserveJob } from '../../store/job/jobActions';
import { findOrCreateChat } from '../../store/inbox/inboxActions';
import { Chatroom } from '../../store/inbox/inboxInterface';
import GoogleMapReact from 'google-map-react';
import SingleMarker from '../mapComponent/singleMarker';

interface RouteParams {
  id: string;
}

const JobDetails: React.FC = () => {
  const zoom = 16;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
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

  const history = useHistory();
  const openChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<any> => {
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
  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleReserve = (): void => {
    if (job.reserved) {
      // TODO - ARE YOU SURE? YOU'LL LOSE YOUR DEPOSIT
      dispatch(unreserveJob(job.id))
        .then(() => {
          setMessage('Reservation Cancelled');
          setOpen(true);
        })
        .catch(() => {
          setMessage('Error - Please Try Again');
          setOpen(true);
        });
    } else {
      dispatch(reserveJob(job.id))
        .then(() => {
          setMessage('Reservation Confirmed');
          setOpen(true);
        })
        .catch(e => {
          setMessage(e);
          setOpen(true);
        });
    }
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
                  job.images && job.images.length ? job.images[0].url : ''
                }')`,
              }}
            />
            <div style={{ display: 'flex' }}>
              <Button
                variant="outlined"
                onClick={handleReserve}
                className="m1em"
              >
                {job.reserved ? 'Cancel' : 'Reserve'}
              </Button>
              <Button variant="outlined" onClick={openChat} className="m1em">
                {' '}
                Message Poster
              </Button>
            </div>
            <div className="container">
              <p className="charcoal">Posted By: {job.createdUser}</p>
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
      ) : (
        <h2>No Job Selected Yet</h2>
      )}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        message={message}
      />
    </div>
  );
};

export default JobDetails;
