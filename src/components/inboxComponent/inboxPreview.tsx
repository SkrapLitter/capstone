import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';

const InboxPreview: React.FC = () => {
  const selectInbox = (state: StoreState) => state.inbox;
  const inbox = useSelector(selectInbox);

  return (
    <div id="messages" className="col s12">
      <div className="m-t-l">
        <h2>My Messages</h2>
        {inbox.chatrooms.length ? (
          <ul className="collection">
            {inbox.chatrooms.map(chatroom => (
              <li key={chatroom.id} className="collection-item left-align">
                <Link to={`/inbox/${chatroom.id}`}>{chatroom.job.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <h2>No Jobs Yet</h2>
        )}
      </div>
    </div>
  );
};

export default InboxPreview;
