import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MessageCount {
  messageCount: number;
}

const initialState: MessageCount = {
    messageCount: 0,
  };


  const messageCountSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
      updateNotificationCount: (
        state,
        action: PayloadAction<
          Partial<MessageCount["messageCount"]>
        >
      ) => {
        state.messageCount = action.payload;
      },
      
    },
  });


  export const { updateNotificationCount } =
  messageCountSlice.actions;

  export default messageCountSlice.reducer;