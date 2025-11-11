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

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={Colorscheme.MAINTHEME}
        barStyle="dark-content"
        translucent={false}
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: '900' }}>Hello World!</Text>
      <Text style={{ fontFamily: Fonts.regular }}>Hello World!</Text>
      <View style={{ width: 50, height: 50 }}>
        {getIcon('PasswordHide', 30, 30)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
