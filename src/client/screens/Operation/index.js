import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import mapStateToProps from '../../services/redux/mapStateToProps';
import mapDispatchToProps from '../../services/redux/mapDispatchToProps';

import { entity } from '../../../config/constants';
import { RibList } from '../../components/ItemList/RibList';
import { styles } from './index.styles';

class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSold: 0,
    };
  }

  componentDidMount() {
    this.props.getComptes();
  }

  render() {
    const { comptes } = this.props;

    return (
      <>
        <View style={[styles.sectionStyle, styles.theadStyle]}>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{entity.email}</Text>
          </View>
          <View style={styles.centerContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{entity.password}</Text>
          </View>
          <View style={styles.rigthContainer}>
            <Text style={[styles.titleText, styles.rigthAlignment]}>{entity.username}</Text>
          </View>
        </View>
        <>
          <FlatList
            scrollEnabled
            data={comptes.list}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <RibList {...item} />
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
)(Operation);
