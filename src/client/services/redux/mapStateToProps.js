const mapStateToProps = (state) => ({
  crud: state.crud,
  users: state.users,
  comptes: state.comptes,
  network: state.network,
  synchronization: state.synchronization,
});

export default mapStateToProps;
