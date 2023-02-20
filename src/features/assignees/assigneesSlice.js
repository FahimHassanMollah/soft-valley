import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAssignees } from './assigneesApi';


const initialState = {

    assignees: [],
    isLoading: false,
    isError: false,
    error: null,

}


export const fetchAssignees = createAsyncThunk('assignees/getAssignees', async (data) => {
    const response = await getAssignees(data);
    return response;
})


export const assigneesSlice = createSlice({
    name: 'assignee',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAssignees.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAssignees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.assignees = action.payload?.data ?? [];

            })
            .addCase(fetchAssignees.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action?.error?.message ?? 'Something went wrong';
                state.assignees = [];
            })
    }
})
// Action creators are generated for each case reducer function
// export const { userLoggedIn, userLoggedOut } = assigneesSlice.actions
export default assigneesSlice.reducer