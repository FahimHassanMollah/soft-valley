import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSources } from './sourcesApi';


const initialState = {

    sources: [],
    isLoading: false,
    isError: false,
    error: null,

}


export const fetchSources = createAsyncThunk('sources/fetchSources', async (data) => {
    const response = await getSources(data);
    return response;
})


export const sourcesSlice = createSlice({
    name: 'source',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSources.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSources.fulfilled, (state, action) => {
                state.isLoading = false;
                state.sources = action.payload?.data ?? [];

            })
            .addCase(fetchSources.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action?.error?.message ?? 'Something went wrong';
                state.sources = [];
            })
    }
})

export default sourcesSlice.reducer