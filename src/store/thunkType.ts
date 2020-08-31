import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { StoreState } from './store';

/* eslint-disable no-undef */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action<string>
>;
