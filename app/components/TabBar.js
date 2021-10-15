import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const TabBar = props => {
  const {tabs, goToPage, activeTab} = props;
  return (
    <View style={[styles.tabs]}>
      {tabs?.map((tab, i) => {
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => goToPage(i)}
            style={styles.tab}>
            <View
              style={
                activeTab === i ? styles.textWrapperActive : styles.textWrapper
              }>
              <Text
                style={activeTab === i ? styles.tabTextActive : styles.tabText}>
                {tab}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    marginLeft: 10,
  },
  textWrapper: {
    height: 30,
    paddingHorizontal: 20,
  },
  textWrapperActive: {
    borderBottomColor: '#7248DD',
    borderBottomWidth: 1,
    height: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  tabText: {
    color: '#C4C4C4',
    fontSize: 16,
    fontFamily: 'Rubik',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#7248DD',
    fontSize: 16,
    fontFamily: 'Rubik',
    fontWeight: '500',
    borderColor: 'red',
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
  },
});

export default TabBar;
