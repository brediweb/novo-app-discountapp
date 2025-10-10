import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { initialize } from 'react-native-clarity';
import { colors } from './src/styles/colors';
import Toast from 'react-native-toast-message';
import Loading from './src/components/Loading';
import MainStack from './src/navigation/routes/MainStack';
import { GlobalContextProvider } from './src/context/GlobalContextProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';
import { OneSignal } from 'react-native-onesignal';


export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Roboto_500Medium,
  });

  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  useEffect(() => {
    if (Platform.OS === 'android') {
      initialize('k80ijj83lf'); // Inicialização do Clarity
    }

    // Inicialização do OneSignal
    OneSignal.initialize('69f5f21c-670c-48bc-91fe-167fdbca809b');
    OneSignal.Notifications.requestPermission(false);
  }, []);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.content, { paddingTop: statusBarHeight }]}>
          <GlobalContextProvider>
            <MainStack />
            <Toast />
          </GlobalContextProvider>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
});
