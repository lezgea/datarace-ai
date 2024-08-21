import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@slices/auth-slice';
import { apiSlice } from '@api/api-slice';
import { injectUserEndpoints } from '@api/user-endpoints';
import { injectCompetitionEndpoints } from '@api/product-endpoints';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// Injects endpoints after the store is configured
injectUserEndpoints();
injectCompetitionEndpoints();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
