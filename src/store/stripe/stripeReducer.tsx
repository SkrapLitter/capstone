import TYPES from '../types';
import { StripeReducer } from './stripeInterface';

const defaultStripe: StripeReducer = {
  account: {},
};

const stripeReducer = (
  state: StripeReducer = defaultStripe,
  action
): StripeReducer => {
  switch (action.type) {
    case TYPES.SET_STRIPE_ACCOUNT:
      return {
        ...state,
        account: action.account,
      };
    default:
      return state;
  }
};

export default stripeReducer;
