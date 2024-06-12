import { PayloadAction, createSlice } from '@reduxjs/toolkit'



export interface disabilityDetailsState{
   disabilityDetails: string
}

const initialState: disabilityDetailsState = {
    disabilityDetails: ""
}

const disabilityDetailsSlice = createSlice({
    name: 'disabilityDetails',
    initialState,
    reducers: {
        updateDetails: (state, action: PayloadAction<Partial<disabilityDetailsState['disabilityDetails']>>) => {
      
            state.disabilityDetails = action.payload
        },
        deleteDisability: (state) => {
            state.disabilityDetails = initialState.disabilityDetails;
        }
        
    },
    
})


export const { updateDetails, deleteDisability } =disabilityDetailsSlice.actions


export default disabilityDetailsSlice.reducer