import React from 'react';
import {Button, View, StyleSheet} from 'react-native';

const HomeContainer = ({navigation}) => {
  return (
    <View style={styles.HomeContainer}>
      <Button
        title="Start the Ticket App"
        onPress={() => navigation.navigate('Ticket')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default HomeContainer;
