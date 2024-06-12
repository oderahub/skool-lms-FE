// formDataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFormDataState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthCountry: string;
  residenceCountry: string;
  nationality: string;
}

const initialState: IFormDataState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  birthCountry: "",
  residenceCountry: "",
  nationality: "",
};

const stepTwoDataSlice = createSlice({
  name: "stepTwoData",
  initialState,
  reducers: {
    updateFormTwoData(state, action: PayloadAction<Partial<IFormDataState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearFormTwoData(state) {
      return {
        ...state,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        birthCountry: "",
        residenceCountry: "",
        nationality: "",
      };
    },
  },
});

export const { updateFormTwoData, clearFormTwoData } = stepTwoDataSlice.actions;
export default stepTwoDataSlice.reducer;
