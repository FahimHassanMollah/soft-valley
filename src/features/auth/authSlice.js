import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login } from './authApi';
import axiosInstance from '../../utlis/axios';
import { toast } from 'react-toastify';

const initialState = {
  accessToken: null,
  user: null,
  isLoading: false,
  isError: false,
  error: null,
  role: "",
  permissions: [],
}


export const postLogin = createAsyncThunk('auth/postLogin', async (data, { rejectWithValue }) => {
  try {
    const response = await login(data);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.state.accessToken;
      state.user = action.payload.state.user;
      state.role = action.payload.state.role;
      state.permissions = action.payload.state.permissions;
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${state.accessToken}`;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload?.data?.token ?? null;
        state.user = action.payload?.data?.user ?? null;
        state.role = action.payload?.data?.role ?? "";
        state.permissions = action.payload?.data?.role_permissions ?? [];
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${state.accessToken}`;
        localStorage.setItem('auth', JSON.stringify({
          state
        }));
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        toast.error(action?.payload?.message ?? "something went wrong");
        state.error = action?.payload?.errors ?? [];
        state.accessToken = null;
        state.user = null;
        state.role = "";
        state.permissions = [];

      })
  }
})
// Action creators are generated for each case reducer function
export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer