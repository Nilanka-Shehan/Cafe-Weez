import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import cardReducer from './CardSlice'; // Import the card reducer

// Configure persistence for the card state
const persistConfig = {
  key: 'card',
  storage,
  whitelist: ['cart', 'menu'], // Include both 'cart' and 'menu' for persistence
};

const persistedReducer = persistReducer(persistConfig, cardReducer);



const store = configureStore({
  reducer: {
    card: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };
