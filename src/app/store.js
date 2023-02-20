import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import LeadsReducer from '../features/leads/leadsSlice';
import StatusesReducer from '../features/statuses/statusesSlice';
import AssigneesReducer from '../features/assignees/assigneesSlice';
import SourcesReducer from '../features/sources/sourcesSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    lead:LeadsReducer,
    status:StatusesReducer,
    assignee:AssigneesReducer,
    source:SourcesReducer,
  },
})