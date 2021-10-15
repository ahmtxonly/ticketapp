import React from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import {StyleSheet, SafeAreaView} from 'react-native';
import {TabBar, PriceCard, ChoosePage, CreateTicketPage} from '@components';

const TicketContainer = () => {
  return (
    <>
      <SafeAreaView style={styles.TicketContainer}>
        <ScrollableTabView
          style={{marginTop: 20}}
          initialPage={0}
          renderTabBar={() => <TabBar />}>
          <ChoosePage tabLabel="Choose" />
          <CreateTicketPage tabLabel="Create Ticket" />
        </ScrollableTabView>
      </SafeAreaView>
      <PriceCard />
    </>
  );
};

const styles = StyleSheet.create({
  TicketContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default TicketContainer;
