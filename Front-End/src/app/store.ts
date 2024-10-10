import { configureStore } from '@reduxjs/toolkit';
import messages from './features/messageSlice';

const store = configureStore({
  reducer: {
    chat: messages,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
