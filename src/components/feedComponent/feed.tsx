import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/store';
import { updateForm } from '../../store/form/formActions';
import Form from '../../store/form/formInterface';
import { ThunkDispatch } from 'redux-thunk';
import { fetchJobs } from '../../store/job/jobActions';
import Job from '../../store/job/jobInterface';

interface stateProps {
  form: Form;
  job: Job;
}
interface dispatchProps {
  dispatch: ThunkDispatch<any, any, any>;
}

type Props = stateProps & dispatchProps;

const Feed: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.dispatch(fetchJobs());
  }, []);
  console.log(props.job);
  return (
    <div>
      <input
        value={props.form.firstName}
        onChange={e => {
          console.log(e.target.value);
          props.dispatch(updateForm('firstName', e.target.value));
        }}
      />
    </div>
  );
};

const mapState = (state: StoreState) => {
  return {
    form: state.form,
    job: state.job,
  };
};
const mapDispatch = dispatch => {
  return {
    dispatch,
  };
};
export default connect<stateProps, dispatchProps>(mapState, mapDispatch)(Feed);
