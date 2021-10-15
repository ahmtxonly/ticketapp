import React from 'react';
import {useSelector} from 'react-redux';

import {View, StyleSheet, FlatList} from 'react-native';

import {TicketButton, RefreshButton} from '@components';

const ChoosePage = () => {
  const {tickets} = useSelector(state => state.ticket) || {};

  return (
    <View style={styles.ticketsContainer}>
      <RefreshButton />
      <FlatList
        scrollEnabled={true}
        numColumns={2}
        data={tickets}
        renderItem={({item}) => <TicketButton item={item} />}
        keyExtractor={item => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ticketsContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
  },
});

export default ChoosePage;
