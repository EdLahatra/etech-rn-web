import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import { styles } from './index.styles';

class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSold: 0,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <>
        <View style={[styles.sectionStyle, styles.theadStyle]}>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>Google Maps</Text>
          </View>
        </View>
        <>
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          />
        </>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Operation);
