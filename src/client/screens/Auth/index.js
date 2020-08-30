import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import Sigin from './Sigin';
import Background from '../../components/Common/background';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      data: {},
      operations: [],
    };
  }

  /**
   * Function to signIn in the app
   *
   * @param {object} data Infos to login.
   * @param {function} callBack Func to execute after success action.
   */
  signIn = async (data, callBack) => {
    const { sendToken, signin } = this.props;
    await signin(data, callBack);
    if (sendToken) {
      await sendToken();
    }
  }

  /**
   * Function to signUp in the app
   *
   * @param {object} data Infos to register.
   * @param {function} callBack Func to execute after success action.
   */
  signUp = async (data, callBack) => {
    this.props.signup(data, callBack);
  }

  render() {
    return (
      <Background>
        <View style={{ flex: 1 }}>
          <Sigin {...this.props} signIn={this.signIn} signUp={this.signUp} />
        </View>
      </Background>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
