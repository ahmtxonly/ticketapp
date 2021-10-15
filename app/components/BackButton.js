import React from 'react';
import {StyleSheet, TouchableHighlight, Image} from 'react-native';
import Assets from '@assets';

const BackButton = ({navigation}) => {
  return (
    <TouchableHighlight
      style={styles.backButton}
      underlayColor="transparent"
      onPress={() => navigation.goBack()}>
      <Image source={Assets.backButtonIcon} style={styles.ImageStyle} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#7A81BE',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6.27,

    elevation: 10,
  },
  ImageStyle: {
    width: 8,
    height: 13,
  },
});

export default BackButton;
