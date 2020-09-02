import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/store';
import { Paper, Tabs, Tab } from '@material-ui/core';
import View from '../../store/view/viewInterface';
import { ThunkDispatch } from 'redux-thunk';
import Job from '../../store/job/jobInterface';
import { setView } from '../../store/view/viewAction';
import PaidJobs from './paidJobs';
import UnpaidJobs from './unpaidJobs';
import SearchJobs from './searchJobs';

interface stateProps {
  job: Job;
  view: View;
}
interface dispatchProps {
  dispatch: ThunkDispatch<any, any, any>;
}

type Props = stateProps & dispatchProps;

const Feed: React.FC<Props> = (props: Props) => {
  return (
    <div className="feedPage">
      <div className="FeedNavContainer">
        <Paper square>
          <h5>Job Navigator</h5>
          <hr />
          <Tabs
            value={props.view.view}
            indicatorColor="secondary"
            textColor="primary"
            onChange={(e, value) => {
              e.preventDefault();
              props.dispatch(setView(value));
            }}
            orientation="vertical"
            variant="scrollable"
            className="feedNav"
          >
            <Tab
              label={`Search Jobs (${props.job.allJobs.length})`}
              value="search"
            />
            <Tab label={`Paid (${props.job.paidJobs.length})`} value="paid" />
            <Tab
              label={`Unpaid (${props.job.unpaidJobs.length})`}
              value="unpaid"
            />
          </Tabs>
        </Paper>
      </div>
      <PaidJobs />
      <UnpaidJobs />
      <SearchJobs />
    </div>
  );
};

const mapState = (state: StoreState) => {
  return {
    job: state.job,
    view: state.view,
  };
};
const mapDispatch = dispatch => {
  return {
    dispatch,
  };
};
export default connect<stateProps, dispatchProps>(mapState, mapDispatch)(Feed);
