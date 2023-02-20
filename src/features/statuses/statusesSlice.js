import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getStatuses } from './statusesApi';


const initialState = {

    statuses: [],
    isLoading: false,
    isError: false,
    error: null,

}


export const fetchStatuses = createAsyncThunk('statuses/getStatuses', async (data) => {
    const response = await getStatuses(data);
    return response;
})


export const statusesSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchStatuses.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchStatuses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.statuses = action.payload?.data ?? [];

            })
            .addCase(fetchStatuses.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action?.error?.message ?? 'Something went wrong';
                state.statuses = [];
            })
    }
})
// Action creators are generated for each case reducer function
// export const { userLoggedIn, userLoggedOut } = statusesSlice.actions
export default statusesSlice.reducer