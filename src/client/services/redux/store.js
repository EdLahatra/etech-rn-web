import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import storage from '@react-native-community/async-storage';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, compose(applyMiddleware(thunk)));

export const persistor = persistStore(store);

export default store;
