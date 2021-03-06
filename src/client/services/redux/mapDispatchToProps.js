import crud from './actions/crud';
import users from './actions/users';
import comptes from './actions/comptes';
import network from './actions/network';
import synchronization from './actions/synchronization';

const mapDispatchToProps = (dispatch) => ({
  getAllCrud: (payload, cb) => dispatch(crud.getAllCrud(payload, cb)),

  // Users
  signin: (payload, cb) => dispatch(users.signin(payload, cb)),
  signup: (payload, cb) => dispatch(users.signup(payload, cb)),
  logout: () => dispatch(users.logout()),

  // Comptes
  getDevices: (payload, cb) => dispatch(comptes.getDevices(payload, cb)),
  getComptes: (payload, cb) => dispatch(comptes.getComptes(payload, cb)),
  getCompte: (payload, cb) => dispatch(comptes.getCompte(payload, cb)),
  createCompte: (payload, cb) => dispatch(comptes.createCompte(payload, cb)),
  createCompteOff: (payload, cb) => dispatch(comptes.createCompteOff(payload, cb)),

  // Network
  haveNetwork: (payload) => dispatch(network.haveNetwork(payload)),

  // Synchronization
  synchronize: (payload) => dispatch(synchronization.synchronize(payload)),
  isSynchronizing: (payload) => dispatch(synchronization.isSynchronizing(payload)),
});

export default mapDispatchToProps;
