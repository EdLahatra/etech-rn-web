import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import { DeviceList } from '../../components/ItemList/DeviceList';
import { styles } from './index.styles';

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSold: 0,
    };
  }

  componentDidMount() {
    this.props.getDevices();
  }

  render() {
    const { devices } = this.props.comptes;

    return (
      <>
        <View style={[styles.sectionStyle, styles.theadStyle]}>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{'UUID'}</Text>
          </View>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{'Devise Info'}</Text>
          </View>
          <View style={styles.rigthContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{'Token'}</Text>
          </View>
        </View>
        <>
          <FlatList
            scrollEnabled
            data={devices}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <DeviceList {...item} user={this.props.users.user} />
            )}
          />
        </>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Device);
