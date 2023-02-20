import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { getLeads } from './leadsApi';


const initialState = {

    leads: [],
    isLoading: false,
    isError: false,
    error: null,
    paginateLinks: [],
    total:0,
    form:0,
    to:0

}


export const postLeads = createAsyncThunk('leads/postLeads', async (data, { rejectWithValue }) => {
   try {
    const response = await getLeads(data);
    return response;
   } catch (error) {
    return rejectWithValue(error.response.data);
   }
})


export const leadsSlice = createSlice({
    name: 'lead',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(postLeads.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postLeads.fulfilled, (state, action) => {
                state.isLoading = false;
                state.leads = action.payload?.data?.data ?? [];
                state.paginateLinks = action.payload?.data?.links ?? [];
                state.form = action.payload?.data?.from ?? 0;
                state.to = action.payload?.data?.to ?? 0;
                state.total = action.payload?.data?.total ?? 0;

            })
            .addCase(postLeads.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                toast.error(action?.payload?.message ?? "something went wrong");
                state.error = action?.error?.message ?? 'Something went wrong';
                state.leads = [];
                state.paginateLinks = [];
                state.form = 0;
                state.to = 0;
                state.total = 0;
            })
    }
})
// Action creators are generated for each case reducer function
export default leadsSlice.reducer