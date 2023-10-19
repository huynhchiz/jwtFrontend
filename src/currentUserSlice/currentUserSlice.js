import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserAccount as getUserAccountService, refreshToken as refreshTokenService } from '../services/userService';

const initUser = {
   //    isLoading: true,
   isAuthenticated: false,
   token: '',
   refreshToken: '',
   account: {
      usertypeWithRoles: '',
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
            state.status = 'idle';
         });
      // .addCase(refreshUser.pending, (state, action) => {
      //    state.status = 'loading';
      // })
      // .addCase(refreshUser.fulfilled, (state, action) => {
      //    state.currentUser = action.payload;
      //    state.status = 'idle';
      // })
      // .addCase(refreshUser.rejected, (state, action) => {
      //    state.status = 'idle';
      // });
   },
});
export default currentUserSlice;

export const fetchCurrentUser = createAsyncThunk('currentUser/fetchCurrentUser', async () => {
   let res = await getUserAccountService();
   console.log({ res });
   if (res && +res.EC === 0) {
      let data = {
         //  isLoading: false,
         isAuthenticated: true,
         token: res.DT.access_token,
         refreshToken: res.DT.refresh_token,
         account: {
            usertypeWithRoles: res.DT.usertypeWithRoles,
            email: res.DT.email,
            username: res.DT.username,
         },
      };
      return data;
   }

   // if (res && +res.EC === -3 && res.EM === 'expired token') {
   //    let newRes = await refreshTokenService();
   //    console.log({ newRes });
   //    if (newRes && +newRes.EC === 0) {
   //       let data = {
   //          isAuthenticated: true,
   //          token: newRes.DT.access_token,
   //          refreshToken: newRes.DT.refresh_token,
   //          account: {
   //             usertypeWithRoles: newRes.DT.usertypeWithRoles,
   //             email: newRes.DT.email,
   //             username: newRes.DT.username,
   //          },
   //       };
   //       console.log('new token:', data);
   //       return data;
   //    }
   // }

   return initUser;
});

export const refreshUser = createAsyncThunk('currentUser/refreshUser', async () => {
   let newRes = await refreshTokenService();
   console.log({ newRes });
   if (newRes && +newRes.EC === 0) {
      let data = {
         isAuthenticated: true,
         token: newRes.DT.access_token,
         refreshToken: newRes.DT.refresh_token,
         account: {
            usertypeWithRoles: newRes.DT.usertypeWithRoles,
            email: newRes.DT.email,
            username: newRes.DT.username,
         },
      };
      console.log('new token:', data);
      return data;
   }
   return initUser;
});
