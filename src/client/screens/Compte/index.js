import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import { home_title } from '../../../config/constants';

import Create from './create';
import Layout from '../Layout';
import Background from '../../components/Common/background';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: {},
    };
  }

  signUp = async (data, callBack) => {
    this.props.signUp(data, callBack);
  }

  render() {
    const { logout, users } = this.props;

    return (
      <Background>
        <Layout {...this.props} title={home_title} logout={logout}>
          <View style={{ flex: 1 }}>
            <Create
              {...this.props}
              signUp={this.signUp}
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
