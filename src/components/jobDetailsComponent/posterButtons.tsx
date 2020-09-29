import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../../store/store';
import { findOrCreateChat } from '../../store/inbox/inboxActions';
import { Chatroom } from '../../store/inbox/inboxInterface';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

interface RouteParams {
  id: string;
}

const PosterButtons: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  // const dispatch: (
  //   a: ThunkAction<any, any, any, any>
  // ) => Promise<any> = useDispatch();

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
        // res(dispatch(findOrCreateChat(job.id, user.id, job.reservedUser)));
        res(findOrCreateChat(job.id, user.id, job.reservedUser));
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
  // console.log('USER', user);
  // console.log('JOB', job);
  return (
    <div style={{ display: 'flex' }}>
      <Button variant="outlined" onClick={openEditPage} className="m1em">
        <EditIcon className="buttonIcon" />
        Edit Details
      </Button>
      {job.reservedUser ? (
        <Button variant="outlined" onClick={openChat} className="m1em">
          <MailOutlineIcon className="buttonIcon" />
          Message Worker
        </Button>
      ) : null}
    </div>
  );
};

export default PosterButtons;
