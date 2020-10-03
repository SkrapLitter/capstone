import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { Button, Paper } from '@material-ui/core';
import { updateAccount } from '../../store/user/userActions';
import axios from 'axios';

const Stripe: React.FC = () => {
  const { user } = useSelector((store: StoreState) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      axios.get(`/api/user/stripe/balance/${user.id}`).then(res => {
        dispatch(updateAccount(res.data));
      });
    }
  }, []);
  const onboarding = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const account = (await axios.post(`/api/user/stripe/onboarding/${user.id}`))
      .data;
    window.location = account;
  };
  const dashboard = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const link = (await axios.get(`/api/user/stripe/dashboard/${user.id}`))
      .data;
    window.location = link;
  };
  return (
    <div>
      {user.clearance ? (
        <Paper>
          <div>
            <h1>Welcome to Stripe {user.firstName}</h1>
            {user.stripe ? (
              <div>
                <h3>Stripe Dashboard</h3>
                <h4> Balance: ${user.balance}</h4>
                <Button
                  onClick={e => dashboard(e)}
                  variant="outlined"
                  color="secondary"
                >
                  Stripe Dashboard
                </Button>
                <div>
                  {user.payments && user.payments.length ? (
                    <ul>
                      {user.payments.map(payment => {
                        return (
                          <li key={payment.id}>
                            <p>{payment.subject}</p>
                            <p>{payment.type}</p>
                            <p>{payment.amount}</p>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <h1>No Payments Yet</h1>
                  )}
                </div>
              </div>
            ) : (
              <>
                <h4>You must complete onboarding</h4>
                <Button onClick={e => onboarding(e)}>
                  Click here to go to onboarding
                </Button>
              </>
            )}
          </div>
        </Paper>
      ) : (
        <h1>You must be logged in to view this page</h1>
      )}
    </div>
  );
};

export default Stripe;
