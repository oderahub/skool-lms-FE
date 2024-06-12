import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface notificationState {
  notificationCount: number;
}

const initialState: notificationState = {
    notificationCount: 0,
  };


  const notificationCountSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
      updateNotificationCount: (
        state,
        action: PayloadAction<
          Partial<notificationState["notificationCount"]>
        >
      ) => {
        state.notificationCount = action.payload;
      },
      
    },
  });


  export const { updateNotificationCount } =
  notificationCountSlice.actions;

  export default notificationCountSlice.reducer;