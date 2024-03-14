import React from 'react';
import { PaperProvider } from 'react-native-paper';
import CustomNavigator from './components/CustomNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { theme } from './core/theme';


export type RootStackParamList = {
  Login:undefined,
  Register:undefined,
  Main: undefined,
  Transactions:undefined
  Budgets:undefined,
  Account:undefined
};

function App(): React.JSX.Element {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <CustomNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;