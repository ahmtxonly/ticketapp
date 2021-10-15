import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {addTicket} from '@actions';
import Assets from '@assets';

const RefreshButton = () => {
  const dispatch = useDispatch();
  const {selectedTickets, user_balance} =
    useSelector(state => state.ticket) || {};

  return (
    <View style={styles.refreshSide}>
      <View>
        {selectedTickets?.length === user_balance && (
          <Text style={styles.errorText}>
            Your balance is not available for more
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => dispatch(addTicket([]))}>
        <Image source={Assets.refreshIcon} style={styles.icon} />
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  refreshSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  refreshText: {
    color: '#C4C4C4',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 12,
  },
});

export default RefreshButton;
