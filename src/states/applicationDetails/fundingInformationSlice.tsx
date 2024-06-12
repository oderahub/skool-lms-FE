import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface fundingInformationState {
    fundingInformation: string;
}

const initialState: fundingInformationState = {
    fundingInformation: ""
};
  
const fundingInformationSlice = createSlice({
    name: 'fundingInformation',
    initialState,
    reducers: {
        updateFundingInformation: (state, action: PayloadAction<string>) => {
            state.fundingInformation = action.payload;
        },
        deleteFundingInformation: (state) => {
            state.fundingInformation = initialState.fundingInformation;
        }
    }
});
  

export const { updateFundingInformation, deleteFundingInformation } = fundingInformationSlice.actions;

export default fundingInformationSlice.reducer;
