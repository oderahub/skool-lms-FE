import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store"

interface Message {
  imageUrl: string;
  name: string;
  message: string;
  time: string;
}

interface MessagesState {
  messages: Message[];
  searchQuery: string;
}

const initialState: MessagesState = {
  messages: [],
  searchQuery: "",
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setMessages, setSearchQuery } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;
export const selectSearchQuery = (state: RootState) => state.messages.searchQuery;
export const selectFilteredMessages = (state: RootState) => {
  const messages = selectMessages(state);
  const searchQuery = selectSearchQuery(state);
  return messages.filter((message) =>
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export default messagesSlice.reducer;


