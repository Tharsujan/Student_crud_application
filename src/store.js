import {configureStore} from '@reduxjs/toolkit';
import {studentApi} from './services/studentApi';

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(studentApi.middleware),
});
