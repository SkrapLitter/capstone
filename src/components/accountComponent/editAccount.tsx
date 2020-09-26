import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import JobsDetailsPreview from '../jobDetailsComponent/jobsDetailsPreview';
import EditAccountForm from './editAccountForm';
import InboxPreview from '../inboxComponent/inboxPreview';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Message from '@material-ui/icons/Message';
import Work from '@material-ui/icons/Work';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  index: any;
  value: any;
  children: JSX.Element;
}

const TabPanel = (props: Props) => {
  const { children, value, index } = props;

  return (
    <div
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      className="s3"
    >
      {value === index && <>{children}</>}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  customTabRoot: {
    backgroundColor: '#00C853',
  },
  customTabIndicator: {
    backgroundColor: '#43A047',
  },
}));

const EditAccount: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);

  const { jobs } = useSelector((state: StoreState) => state.job);

  const selectInbox = (state: StoreState) => state.inbox;
  const inbox = useSelector(selectInbox);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  useEffect(() => {
    /* eslint-disable @typescript-eslint/ban-types */
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    e.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <img
        src={user.image}
        width="75"
        height="75"
        className="border-circle z-depth-1"
        alt={`${firstName} ${lastName}`}
      />
      <h4>
        <strong>
          {firstName} {lastName}
        </strong>
      </h4>

      <div className="row m-t-l">
        <div className="col s12">
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              classes={{
                root: classes.customTabRoot,
                indicator: classes.customTabIndicator,
              }}
            >
              <Tab icon={<PersonPinIcon />} label="Edit Profile" />
              <Tab icon={<Work />} label={`My Jobs (${jobs.length || 0})`} />
              <Tab
                icon={<Message />}
                label={`Messages (${inbox.inbox.length || 0})`}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <EditAccountForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <JobsDetailsPreview />
// OLD CODE WITH CORRECT PATHS
          </div>
        </div>
        <div id="messages" className="col s12">
          <div className="m-t-l">
            <h2>My Messages</h2>
            {inbox.inbox.length ? (
              <ul className="collection">
                {inbox.inbox.map(chatroom => (
                  <li key={chatroom.id} className="collection-item left-align">
                    <Link to={`/inbox/${chatroom.id}`}>
                      {chatroom.job.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <h2>No Jobs Yet</h2>
            )}
          </div>
// END OF OLD CODE
          </TabPanel>
          <TabPanel value={value} index={2}>
            <InboxPreview />
          </TabPanel>
        </div>
      </div>
    </>
  );
};

export default EditAccount;
