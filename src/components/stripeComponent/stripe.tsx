import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { updateAccount } from '../../store/user/userActions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  List,
  Box,
  Grid,
  Button,
  Typography,
  Paper,
  ButtonBase,
  ListItem,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles({
  red: {
    background: 'lightcoral',
    padding: '10px',
  },
  green: {
    background: 'lightgreen',
    padding: '10px',
  },
  row1: {
    width: '18vw',
    textAlign: 'center',
    margin: 'auto',
  },
  row2: {
    width: '30vw',
    margin: 'auto',
  },
  row3: {
    width: '15vw',
    textAlign: 'center',
    margin: 'auto',
  },
});

const Stripe: React.FC = () => {
  const { user } = useSelector((store: StoreState) => store);
  const STRIPE_API = '/api/user/stripe';
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      axios.get(`${STRIPE_API}/balance/${user.id}`).then(res => {
        dispatch(updateAccount(res.data));
      });
    }
  }, []);
  const onboarding = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const account = (await axios.post(`${STRIPE_API}/onboarding/${user.id}`))
      .data;
    window.location = account;
  };
  const dashboard = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const link = (await axios.get(`${STRIPE_API}/dashboard/${user.id}`)).data;
    window.location = link;
  };
  const classes = useStyles();
  return (
    <Box py={5}>
      {user.clearance ? (
        <>
          {user.stripe ? (
            <div className="stripe">
              <h1>Skrap Payment Dashboard</h1>
              <br />
              <h2>Balance: ${user.balance}</h2>
              <br />
              <Button
                onClick={e => dashboard(e)}
                variant="outlined"
                color="secondary"
              >
                Stripe Dashboard
              </Button>
              <hr />
              <h2>Payment History</h2>
              <br />
              {user.payments && user.payments.length ? (
                <List>
                  {user.payments.map((payment: any) => {
                    return (
                      <div key={payment.id}>
                        <Paper>
                          <Grid container spacing={1}>
                            <Grid item xs="auto">
                              <ButtonBase>
                                <PaymentIcon
                                  className={
                                    payment.type === 'payment' ||
                                    payment.type === 'refund'
                                      ? classes.green
                                      : classes.red
                                  }
                                  fontSize="large"
                                />
                                <List className={classes.row1}>
                                  <ListItem>
                                    <Link to={`/jobs/${payment.job.id}`}>
                                      {payment.job.name}
                                    </Link>
                                  </ListItem>
                                  <ListItem>
                                    {payment.job.address}, {payment.job.city},{' '}
                                    {payment.job.state}
                                  </ListItem>
                                </List>
                              </ButtonBase>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid
                              item
                              xs="auto"
                              sm
                              container
                              className={classes.row2}
                            >
                              <List>
                                <ListItem>
                                  {moment(payment.createdAt).format(
                                    'MMMM Do YYYY, h:mm a'
                                  )}
                                  : {payment.subject}
                                </ListItem>
                                <ListItem>Type: {payment.type}</ListItem>
                              </List>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item className={classes.row3} xs="auto">
                              <span>
                                {payment.type === 'payment' ||
                                payment.type === 'refund'
                                  ? '  +  '
                                  : '  -  '}
                                ($ {payment.amount})
                              </span>
                            </Grid>
                          </Grid>
                        </Paper>
                        <br />
                      </div>
                    );
                  })}
                </List>
              ) : (
                <Typography variant="h4" component="h4">
                  No Payments Yet
                </Typography>
              )}
            </div>
          ) : (
            <>
              <Alert severity="warning">You must complete onboarding</Alert>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Box py={5}>
                  <Button
                    onClick={onboarding}
                    size="large"
                    color="primary"
                    variant="contained"
                  >
                    Start onboarding
                  </Button>
                </Box>
              </Grid>
            </>
          )}
        </>
      ) : (
        <Typography variant="h4" component="h4">
          You must be logged in to view this page
        </Typography>
      )}
    </Box>
  );
};

export default Stripe;
