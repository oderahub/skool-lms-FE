import { PayloadAction, createSlice } from '@reduxjs/toolkit'



export interface employmentDetailsState{
    employmentDetails: boolean | null
}

const initialState: employmentDetailsState = {
    employmentDetails: null
}

const employmentDetailsSlice = createSlice({
    name: 'employmentDetails',
    initialState,
    reducers: {
        updateDetails: (state, action: PayloadAction<Partial<employmentDetailsState['employmentDetails']>>) => {
            state.employmentDetails = action.payload
        },
        deleteEmploymentDetails: (state) => {
            state.employmentDetails = initialState.employmentDetails;
        }
    },
    
})


export const { updateDetails, deleteEmploymentDetails } = employmentDetailsSlice.actions


export default employmentDetailsSlice.reducer