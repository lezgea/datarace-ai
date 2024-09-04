import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@slices/user-slice';
import categoryReducer from '@slices/category-slice';
import { userApi } from '@api/user-api';
import { categoryApi } from '@api/category-api';


export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoryReducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, categoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
