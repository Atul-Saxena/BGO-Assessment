import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface Message {
    sender: 'user' | 'ai';
    text: string;
  }
  
  interface ChatState {
    messages: Message[];
  }
  
  const initialState: ChatState = {
    messages: [],
  };
  
  const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      addMessage: (state, action: PayloadAction<Message>) => {
        state.messages.push(action.payload);
      },
    },
  });
  
  export const { addMessage } = chatSlice.actions;
  export default chatSlice.reducer;