import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@slices/auth-slice';  // Your auth slice
import { userApi } from '@api/user-api';
import { productApi } from '@api/product-api';

export const store = configureStore({
    reducer: {
        auth: authReducer,  // Your auth slice reducer
        [userApi.reducerPath]: userApi.reducer,  // User API slice reducer
        [productApi.reducerPath]: productApi.reducer,  // Product API slice reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, productApi.middleware),
});

// Injects endpoints after the store is configured
injectUserEndpoints();
injectCompetitionEndpoints();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
