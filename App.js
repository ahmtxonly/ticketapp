import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import HomeContainer from './app/containers/HomeContainer';
import TicketContainer from './app/containers/TicketContainer';

import rootReducer from './app/reducers';
import {BackButton} from '@components';
import {Button} from 'react-native';

const globalStore = createStore(rootReducer, applyMiddleware(thunkMiddleware));
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={globalStore}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShadowVisible: false,
            cardStyle: {backgroundColor: '#fff'},
          }}>
          <Stack.Group
            screenOptions={({navigation}) => ({
              headerBackVisible: false,
              headerTitle: () => <></>,
              headerLeft: ({canGoBack}) =>
                canGoBack && <BackButton navigation={navigation} />,
            })}>
            <Stack.Screen name="Home" component={HomeContainer} />
            <Stack.Screen name="Ticket" component={TicketContainer} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
