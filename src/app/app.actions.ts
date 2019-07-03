import { createAction } from '@ngrx/store';

export const increment = createAction('[BankComponent] Increment', (payload: number) => ({payload}));
export const decrement = createAction('[BankComponent] Decrement', (payload: number) => ({payload}));
export const resume = createAction('[TransactionComponent] Resume', (userLoan: object) => ({userLoan}));