import { createSlice } from '@reduxjs/toolkit';

interface UserDetailsState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    userId: string
}

const initialState: UserDetailsState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    userId: ''
};

const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        login: (state, action) => {
            const user = action.payload;
            return Object.assign(state, user);
        },
        clearUserDetails: () => initialState,
    },
});

export const { login, clearUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
