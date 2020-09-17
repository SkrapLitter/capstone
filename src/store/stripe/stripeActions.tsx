import TYPES from '../types';
import { AppThunk } from '../thunkType';
import axios from 'axios';

interface stripeAction {
  type: string;
  account: any;
}
const setAccount = (account: any): stripeAction => ({
  type: TYPES.SET_STRIPE_ACCOUNT,
  account,
});

export const fetchStripeAccount = (userId: string): AppThunk => {
  return async dispatch => {
    console.log(userId);
    if (userId) {
      const account = (await axios.get(`/api/user/stripe/account/${userId}`))
        .data;
      console.log(account);
      dispatch(setAccount(account));
    }
  };
};
