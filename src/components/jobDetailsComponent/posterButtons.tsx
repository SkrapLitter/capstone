import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../../store/store';
import { findOrCreateChat } from '../../store/inbox/inboxActions';
import { Chatroom } from '../../store/inbox/inboxInterface';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { JobAttributes } from '../../store/job/jobInterface';
import { completeJob } from '../../store/job/jobActions';

interface RouteParams {
  id: string;
}

const PosterButtons: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const dispatch: (
    a: ThunkAction<any, any, any, any>
  ) => Promise<any> = useDispatch();

  const {
    user,
    job: { job },
  } = useSelector((state: StoreState) => state);

  const openChat = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<any> => {
    e.preventDefault();
    return new Promise((res, rej) => {
      try {
        res(dispatch(findOrCreateChat(job.id, user.id, job.reservedUser)));
      } catch (err) {
        rej(err);
      }
    }).then((res: Chatroom) => {
      if (res) {
        history.push(`/inbox/${res.id}`);
      }
    });
  };
  const openEditPage = () => {
    history.push(`/job/edit/${id}`);
  };
  const handleComplete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    curJob: JobAttributes
  ): void => {
    e.preventDefault();
    dispatch(completeJob(curJob));
    history.push(`/account`);
  };
  return (
    <>
      {job.status !== 'completed' ? (
        <div className="jobDetailsButtons">
          <Button variant="outlined" onClick={openEditPage}>
            <EditIcon className="buttonIcon" />
            Edit Details
          </Button>
          {job.reservedUser ? (
            <Button variant="outlined" onClick={openChat} className="m1em">
              <MailOutlineIcon className="buttonIcon" />
              Message Worker
            </Button>
          ) : null}
          {job.userId === user.id && job.status === 'pendingVerification' ? (
            <Button
              variant="outlined"
              onClick={e => handleComplete(e, job)}
              className="m1em"
            >
              Complete Job
            </Button>
          ) : null}
        </div>
      ) : (
        <h4>This Job Is Completed</h4>
      )}
    </>
  );
};

export default PosterButtons;
