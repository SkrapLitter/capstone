import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { fetchJobsByUser } from '../../store/job/jobActions';
import JobsDetailsPreview from '../jobDetailsComponent/jobsDetailsPreview';
import EditAccountForm from './editAccountForm';
import InboxPreview from '../inboxComponent/inboxPreview';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HistoryIcon from '@material-ui/icons/History';
import PaymentIcon from '@material-ui/icons/Payment';
import Message from '@material-ui/icons/Message';
import Work from '@material-ui/icons/Work';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme: Theme) => ({
  tabRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  tabIndicator: {
    backgroundColor: theme.palette.primary.dark,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    boxShadow: theme.shadows[3],
  },
}));

const EditAccount: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);

  const selectJobs = (state: StoreState) => state.job;
  const { userJobs } = useSelector(selectJobs);
  const jobsTypes = Object.keys(userJobs);
  const jobsQty = jobsTypes.reduce((acc, val) => {
    return acc + userJobs[val].length;
  }, 0);

  const selectInbox = (state: StoreState) => state.inbox;
  const inbox = useSelector(selectInbox);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [value, setValue] = React.useState(0);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    /* eslint-disable @typescript-eslint/ban-types */
    setFirstName(user.firstName);
    setLastName(user.lastName);
    dispatch(fetchJobsByUser(user.id));
  }, [user]);
  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    e.preventDefault();
    setValue(newValue);
  };

  return (
    <Container fixed>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={12}>
          <Avatar
            src={user.image}
            variant="circle"
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1">
            {firstName} {lastName}
          </Typography>
        </Grid>
      </Grid>
      <Box py={5}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            classes={{
              root: classes.tabRoot,
              indicator: classes.tabIndicator,
            }}
          >
            <Tab icon={<Work />} label={`My Jobs (${jobsQty || 0})`} />
            <Tab icon={<PersonPinIcon />} label="Edit Profile" />
            <Tab
              icon={<Message />}
              label={`Messages (${inbox.chatrooms.length || 0})`}
            />
            <Tab icon={<HistoryIcon />} label="History" />
            <Tab icon={<PaymentIcon />} label="Payment" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <JobsDetailsPreview />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EditAccountForm />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <InboxPreview />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div>History</div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div>Payments</div>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default EditAccount;
