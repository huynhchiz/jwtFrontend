import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserAccount as getUserAccountService } from '../services/userService';

const initUser = {
   //    isLoading: true,
   isAuthenticated: false,
   token: '',
   account: {
      email: '',
      username: '',
   },
};

const currentUserSlice = createSlice({
   name: 'currentUser',
   initialState: { status: 'idle', currentUser: initUser },
   reducers: {
      loginUser: (state, action) => {
         state.currentUser = action.payload;
      },

      logoutUser: (state, action) => {
         state.currentUser = initUser;
      },
   },
   extraReducers: (builder) => {
      // fetch user account
      builder
         .addCase(fetchCurrentUser.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.status = 'idle';
         })
         .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.currentUser = initUser;
            state.status = 'error';
         });
   },
});
export default currentUserSlice;

export const fetchCurrentUser = createAsyncThunk('currentUser/fetchCurrentUser', async (currentUser) => {
   let res = await getUserAccountService();
   if (res && +res.EC === 0) {
      let data = {
         //  isLoading: false,
         isAuthenticated: true,
         token: res.DT.access_token,
         account: {
            usertypeWithRoles: res.DT.usertypeWithRoles,
            email: res.DT.email,
            username: res.DT.username,
         },
      };

      return data;
   } else {
      return initUser;
   }
});
