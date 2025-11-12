/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { Colorscheme } from './src/constants/Colors';
import { Fonts } from './src/constants/index';
import { getIcon } from './src/utils/iconutils/IconUtility';
import { Provider } from 'react-redux';
import { store } from './src/redux/store'

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <StatusBar
        backgroundColor={Colorscheme.MAINTHEME}
        barStyle="dark-content"
        translucent={false}
      />
      <AppNavigator />
    </SafeAreaProvider>
    </Provider>
    
  );
}


export default App;
