import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import { home_title } from '../../../config/constants';

import Background from '../../components/Common/background';
import Layout from '../Layout';
import Create from './create';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: {},
    };
  }

  createEntity = async (data, callBack) => {
    // this.props.createCompte(data, callBack);
    this.props.createCompteOff(data, callBack).then(() => {
      console.log('network while sync ', this.props.network);
      if (this.props.network.network === true) {
        this.props.synchronize(this.props.comptes);
      }
    });

  }

  render() {
    const { logout, users } = this.props;
    return (
      <Background>
        <Layout {...this.props} title={home_title} logout={logout}>
          <View style={{ flex: 1 }}>
            <Create
              {...this.props}
              createEntity={this.createEntity}
              user={users.user || {}}
            />
          </View>
        </Layout>
      </Background>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
