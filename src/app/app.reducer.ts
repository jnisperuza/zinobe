import { createReducer, on } from '@ngrx/store';
import { AppSettings } from './app-settings';
import { increment, decrement, resume } from './app.actions';

export const initialState = AppSettings.BANK_AMOUNT;

export const counterReducer = createReducer(initialState,
  on(increment, (state, object) => state + object.payload),
  on(decrement, (state, object) => state - object.payload)
);

export const resumeReducer = createReducer({},
  on(resume, (state, object) => {
    return state = object.userLoan
  })
);