import { StyleSheet} from 'react-native';
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ApolloProvider } from '@apollo/client';
import client from './src/gql/client';

import HomeScreen from './src/HomeScreen';
import CountriesScreen from './src/CountriesScreen';
import CountriesScreen2 from './src/CountriesScreen';

const Stack = createNativeStackNavigator();


export default function App() {

  const _goBack = () => console.log('Went back');

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home"
            component={HomeScreen}
            options={{title: "Practical Task"}}
          />
          <Stack.Screen 
            name="Countries"
            component={CountriesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}