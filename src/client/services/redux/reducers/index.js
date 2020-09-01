import { combineReducers } from 'redux';
import crud from './crud';
import users from './users';
import comptes from './comptes';
import network from './network';
import synchronization from './synchronization';

const reducers = combineReducers({
  log: () => {
    // eslint-disable-next-line no-console
    console.log('action');
    return {};
  },
  crud,
  users,
  comptes,
  network,
  synchronization,
});

export default reducers;
