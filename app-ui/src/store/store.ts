import { configureStore } from '@reduxjs/toolkit';
import config from './reducers/config-reducer';
import mediaSlice from './reducers/media-reducer';

const store = configureStore({
    reducer: {
        config, mediaSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;