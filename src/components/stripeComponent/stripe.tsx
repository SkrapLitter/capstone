import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { Button } from '@material-ui/core';
import { updateAccount } from '../../store/user/userActions';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Alert from '@material-ui/lab/Alert';

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
  return (
    <Box py={5}>
      {user.clearance ? (
        <>
          {user.stripe ? (
            <>
              <Typography variant="h3" component="h3">
                Stripe Dashboard
              </Typography>
              <Typography variant="h4" component="h4">
                Balance: ${user.balance}
              </Typography>
              <Button
                onClick={e => dashboard(e)}
                variant="outlined"
                color="secondary"
              >
                Stripe Dashboard
              </Button>
              {user.payments && user.payments.length ? (
                <List>
                  {user.payments.map(payment => {
                    return (
                      <ListItem key={payment.id}>
                        <p>{payment.subject}</p>
                        <p>{payment.type}</p>
                        <p>{payment.amount}</p>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <Typography variant="h4" component="h4">
                  No Payments Yet
                </Typography>
              )}
            </>
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
