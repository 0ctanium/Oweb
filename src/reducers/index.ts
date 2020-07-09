import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import { firebaseReducer } from 'react-redux-firebase';
import storage from 'redux-persist/lib/storage';
import stateType from './types';

const persistConfig: PersistConfig<stateType> = {
  key: 'root',
  storage,
  whitelist: [],
};

export default persistReducer<stateType>(
  persistConfig,
  combineReducers<stateType>({
    firebase: firebaseReducer,
    // firestore: firestoreReducer // <- needed if using firestore
  })
);
