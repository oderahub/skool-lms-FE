import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface academicReferencesState {
  academicReferences: boolean | null;
}

const initialState: academicReferencesState = {
  academicReferences: null,
};

const academicReferencesSlice = createSlice({
  name: "academicReferences",
  initialState,
  reducers: {
    updateDetails: (
      state,
      action: PayloadAction<
        Partial<academicReferencesState["academicReferences"]>
      >
    ) => {
      state.academicReferences = action.payload;
    },
    deleteAcademicReferences: (state) => {
      state.academicReferences = initialState.academicReferences;
    },
  },
});

export const { updateDetails, deleteAcademicReferences } =
  academicReferencesSlice.actions;

export default academicReferencesSlice.reducer;