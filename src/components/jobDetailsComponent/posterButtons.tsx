import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../../store/store';
import { findOrCreateChat } from '../../store/inbox/inboxActions';
import { Chatroom } from '../../store/inbox/inboxInterface';
import Button from '@material-ui/core/Button';

interface RouteParams {
    id: string;
  }

const PosterButtons: React.FC = () => {

    const history = useHistory();
    const { id } = useParams<RouteParams>();

    const dispatch: (
        a: ThunkAction<any, any, any, any>
      ) => Promise<any> = useDispatch();

    const { user, job: { job }} = useSelector((state: StoreState) => state);

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
      const openEditPage = () => {
          history.push(`/job/edit/${id}`)
      }
    return (
      <div style={{ display: 'flex' }}>
        <Button
          variant="outlined"
          onClick={openEditPage}
          className="m1em"
        >
          Edit Details
        </Button>
        <Button variant="outlined" onClick={openChat} className="m1em">
          Message Poster
        </Button>
      </div>
    )
}

export default PosterButtons;