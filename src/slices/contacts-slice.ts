import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { contactsApi } from '@api/contact-api';
import { IUser } from '@api/types/user-types';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


interface IContactState {
    isAuthenticated: boolean;
    user: IUser | null;
    loading: boolean;
    error: string | null;
    description: string | null;
}

const initialState: IContactState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
    description: null,
};

const contactsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<{ isAuthenticated: boolean, user: IUser | null }>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.loading = false;  // Loading is done once this action is dispatched
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
            state.error = null;
            Cookies.remove('dtr-token');
        },
    },
    extraReducers: (builder) => {
        // SEND CONTACT DETAILS
        builder
            .addMatcher(
                contactsApi.endpoints.sendContactDetails.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                contactsApi.endpoints.sendContactDetails.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    toast.success("Successfull operation!")
                }
            )
            .addMatcher(
                contactsApi.endpoints.sendContactDetails.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Operation failed';
                }
            );
    },
});

export const { } = contactsSlice.actions;

export default contactsSlice.reducer;
