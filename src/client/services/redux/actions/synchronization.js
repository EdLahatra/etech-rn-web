import constants from '../constants/synchronization';
import compteConstants from '../constants/comptes';
import states from '../constants/state';
import comptesSapp from '../../applicatif/comptes';

export const isSynchronizing = (payload) => async (dispatch) => dispatch({
  type: constants.isSynchronizing,
  payload: payload,
});

export const synchronize = (payload) => async (dispatch) => {
  const dataToSync = payload.list.filter(entity => entity.state !== states.synchronized);
  console.log('Data To Sync', dataToSync);
  const dataToCreate = dataToSync.filter(entity => entity.state === states.created);
  if (dataToCreate && dataToCreate.length > 0) {
    // Insert datas
    dataToCreate.forEach(async (element) => {
      console.log("it's creating", element);
      await comptesSapp.createCompte(compteConstants.url.comptes, element);
    });

    // Get all entities
    const comptes = await comptesSapp.getCompte(compteConstants.url.comptes);
    console.log('get all', comptes);
    if (comptes && comptes.data && comptes.data.length > 0) {
      comptes.data.map(element => ({ ...element, state: states.synchronized }));
      return dispatch({
        type: compteConstants.getComptes,
        payload: comptes.data,
      });
    }
  } else {
    return dispatch({
      type: constants.synchronize,
      payload: dataToSync,
    });
  }
};

export default { synchronize, isSynchronizing };
