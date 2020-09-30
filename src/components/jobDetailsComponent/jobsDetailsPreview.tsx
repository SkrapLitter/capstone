import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobsByUser } from '../../store/job/jobActions';
import { StoreState } from '../../store/store';
import JobDetailsPreview from './jobDetailsPreview';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const jobsDetailsPreview: React.FC = () => {
  const selectUser = (state: StoreState) => state.user;
  const user = useSelector(selectUser);

  const selectJobs = (state: StoreState) => state.job;
  const {
    userJobs: { active, cancelled, completed, pending, pendingVerification },
  } = useSelector(selectJobs);

  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchJobsByUser(user.id));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    e.preventDefault();
    setValue(newValue);
  };

  return (
    <Box py={5} className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab label="Active" />
        <Tab label="Cancelled" />
        <Tab label="Completed" />
        <Tab label="Pending" />
        <Tab label="Verifivation" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <JobDetailsPreview jobs={active} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <JobDetailsPreview jobs={cancelled} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <JobDetailsPreview jobs={completed} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <JobDetailsPreview jobs={pending} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <JobDetailsPreview jobs={pendingVerification} />
      </TabPanel>
    </Box>
  );
};

export default jobsDetailsPreview;
