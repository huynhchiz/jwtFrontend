import { configureStore } from '@reduxjs/toolkit';
import currentUserSlice from '../currentUserSlice/currentUserSlice';

const store = configureStore({
   reducer: {
      currentUser: currentUserSlice.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
