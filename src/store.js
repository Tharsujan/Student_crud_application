import {configureStore} from '@reduxjs/toolkit';
import {studentApi} from './services/studentApi';
import {setupListeners} from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(studentApi.middleware),
});
setupListeners(store.dispatch);
