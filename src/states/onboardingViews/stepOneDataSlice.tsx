// steponeDataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISteponeState {
  courseType: string;
  studyMode: string;
  courseSearch: string;
  entryYear: string;
  entryMonth: string;
}

const initialState: ISteponeState = {
  courseType: "",
  studyMode: "",
  courseSearch: "",
  entryYear: "",
  entryMonth: "",
};

const steponeDataSlice = createSlice({
  name: "steponeData",
  initialState,
  reducers: {
    updateFormOneData(state, action: PayloadAction<Partial<ISteponeState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearFormOneData(state) {
      return {
        ...state,
        courseType: "",
        studyMode: "",
        courseSearch: "",
        entryYear: "",
        entryMonth: "",
      };
    }
  },
});

export const { updateFormOneData, clearFormOneData } = steponeDataSlice.actions;
export default steponeDataSlice.reducer;
