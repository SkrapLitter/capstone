/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppThunk } from '../../store/thunkType';
import { StoreState } from '../../store/store';
import { findOrCreateChat } from '../../store/inbox/inboxActions';
import { Chatroom } from '../../store/inbox/inboxInterface';
import { reserveJob, unreserveJob } from '../../store/job/jobActions';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import socket from '../../socket';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const UserButtons: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const history = useHistory();

  const dispatch: (a: AppThunk) => Promise<any> = useDispatch();

  const {
    user,
    job: { job },
  } = useSelector((state: StoreState) => state);

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const openChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<any> => {
    e.preventDefault();
    if (!user.clearance) {
      setMessage('You must be logged in to send a message');
      setOpen(true);
      return;
    }
    return new Promise((res, rej) => {
      try {
        res(dispatch(findOrCreateChat(job.id, job.userId, user.id)));
      } catch (err) {
        rej(err);
      }
    }).then((res: Chatroom) => {
      if (res) {
        history.push(`/inbox/${res.id}`);
      }
    });
  };
  const handleReserve = (): void => {
    if (job.reserved) {
      // TODO - ARE YOU SURE? YOU'LL LOSE YOUR DEPOSIT
      dispatch(unreserveJob(job.id))
        .then(data => {
          socket.emit('unreserve', data, user.id);
          setMessage('Reservation Cancelled');
          setOpen(true);
        })
        .catch(() => {
          setMessage('Error - Please Try Again');
          setOpen(true);
        });
    } else if (user.clearance) {
      dispatch(reserveJob(job.id))
        .then(data => {
          socket.emit('reserve', data);
          setMessage('Reservation Confirmed');
          setOpen(true);
        })
        .catch(e => {
          setMessage(e);
          setOpen(true);
        });
    } else {
      setMessage('You must be logged in to reserve a job');
      setOpen(true);
    }
  };
  const renderButton = (): JSX.Element => {
    if (job.reserved) {
      if (job.reservedUser === user.id) {
        return (
          <Button variant="outlined" onClick={handleReserve}>
            <CloseIcon className="buttonIcon" />
            &nbsp;Cancel
          </Button>
        );
      }

      return null;
    }
    return (
      <Button variant="outlined" onClick={handleReserve}>
        <DoneIcon className="buttonIcon" />
        &nbsp;Reserve
      </Button>
    );
  };
  return (
    <>
      {job.status !== 'completed' ? (
        <div className="jobDetailsButtons">
          {renderButton()}
          <Button variant="outlined" onClick={openChat}>
            <MailOutlineIcon className="buttonIcon" />
            Message Poster
          </Button>
          {job.reservedUser !== user.id && (
            <Button
              variant="outlined"
              onClick={() => history.push(`/checkout/${job.id}`)}
            >
              <AttachMoneyIcon className="buttonIcon" />
              Fund Job
            </Button>
          )}
          {job.reservedUser === user.id ? (
            <Button
              variant="outlined"
              onClick={() => history.push(`/verify/${job.id}`)}
              className="m1em"
            >
              Verify Job Completion
            </Button>
          ) : null}
          <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
            message={message}
          />
        </div>
      ) : (
        <h4>This Job Is Completed</h4>
      )}
    </>
  );
};

export default UserButtons;
