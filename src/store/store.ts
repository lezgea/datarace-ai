import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@slices/user-slice';
import categoryReducer from '@slices/category-slice';
import competitionReducer from '@slices/competition-slice';
import { userApi } from '@api/user-api';
import { categoryApi } from '@api/category-api';
import { competitionApi } from '@api/competition-api';


export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoryReducer,
        competitions: competitionReducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [competitionApi.reducerPath]: competitionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, categoryApi.middleware, competitionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
