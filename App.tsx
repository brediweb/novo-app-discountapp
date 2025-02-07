import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated'; // Deve ser importado no topo
import { colors } from './src/styles/colors';
import Toast from 'react-native-toast-message';
import Loading from './src/components/Loading';
import { OneSignal } from 'react-native-onesignal';
import { initialize } from 'react-native-clarity';
import MainStack from './src/navigation/routes/MainStack';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { GlobalContextProvider } from './src/context/GlobalContextProvider';
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

  useEffect(() => {
    if (Platform.OS === 'android') {
      initialize('k80ijj83lf'); // Inicialização do Clarity
    }

    // Inicialização do OneSignal
    OneSignal.initialize('a903186d-f2c1-4e58-b11c-b15b8f1ec590');
    OneSignal.Notifications.requestPermission(true);
  }, []);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <GlobalContextProvider>
          <MainStack />
          <Toast />
        </GlobalContextProvider>
      </SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
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
});
