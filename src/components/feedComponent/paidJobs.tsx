import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/store';
import { useHistory } from 'react-router-dom';
import { Paper, Grid, ButtonBase, Typography, Button } from '@material-ui/core';
import View from '../../store/view/viewInterface';
import User from '../../store/user/userInterface';
import { ThunkDispatch } from 'redux-thunk';
import Job from '../../store/job/jobInterface';
import { reserveJob } from '../../store/job/jobActions';

interface stateProps {
  job: Job;
  view: View;
  user: User;
}
interface dispatchProps {
  dispatch: ThunkDispatch<any, any, any>;
}

type Props = stateProps & dispatchProps;

const PaidJobs: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  return (
    <div className={props.view.view === 'paid' ? 'jobContainer' : 'ghost'}>
      {props.job.paidJobs.length ? (
        props.job.paidJobs.map(job => {
          return (
            <div className="grid" key={job.id}>
              <Paper>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase>
                      <img
                        alt="complex"
                        src={job.image}
                        width={250}
                        height={200}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="h4">
                          {job.name}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                          Description:{job.description}
                        </Typography>
                        <Typography variant="subtitle2">
                          Address:{job.address} <br />
                          {job.state} {job.city}
                        </Typography>
                        <Typography variant="subtitle2">
                          Payment:${job.price.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={e => {
                            e.preventDefault();
                            props.dispatch(reserveJob(job.id, props.user.id));
                          }}
                          disabled={job.reserved}
                        >
                          Reserve Job
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={e => {
                            e.preventDefault();
                            history.push('/inbox');
                          }}
                        >
                          Contact Poster
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })
      ) : (
        <h2>No Jobs Yet</h2>
      )}
    </div>
  );
};

const mapState = (state: StoreState) => {
  console.log(state.user);
  return {
    job: state.job,
    view: state.view,
    user: state.user,
  };
};
const mapDispatch = dispatch => {
  return {
    dispatch,
  };
};
export default connect<stateProps, dispatchProps>(
  mapState,
  mapDispatch
)(PaidJobs);
