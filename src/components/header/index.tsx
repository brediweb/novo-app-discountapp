import { colors } from '../../styles/colors';
import React, { useEffect, useState } from 'react';
import { useNavigate } from '../../hooks/useNavigate';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomHeader(props: any) {
  const { goBack, navigate } = useNavigate();
  const [tipoUser, setTipoUser] = useState<any>(null);

  function handleGoBack() {
    console.log('props.route.name', tipoUser, props.route.name, props.route.name.includes('ClientePerfilTrocarFotoScreen'));
    if (
      tipoUser === 'Anunciante' &&
      (props.route.name.includes('ClientePerfilTrocarFotoScreen') ||
        props.route.name.includes('ClientePerfilInformacoesScreen') ||
        props.route.name.includes('ClientePerfilCategoriaScreen'))
    ) {
      return navigate('ClientePerfilScreen');
    }
    goBack();
  }

  async function getUser() {
    try {
      const response = await AsyncStorage.getItem('infos-user');
      if (response !== null) {
        const responseParse = JSON.parse(response);
        setTipoUser(responseParse.tipo_usuario);
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <View className="flex-1 ">
        <View
          className="flex flex-row justify-between items-center h-16 w-full px-4"
          style={{ backgroundColor: colors.secondary50 }}
        >
          {props.route.name === 'Home' ||
          props.route.name === 'HomeClienteScreen' ? (
            <TouchableOpacity
              className="p-2"
              onPress={() => props.navigation.toggleDrawer()}
            >
              <Image
                source={require('../../../assets/img/icons/menu-white.png')}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="p-2" onPress={handleGoBack}>
              <Image
                source={require('../../../assets/img/icons/seta-esquerda-white.png')}
              />
            </TouchableOpacity>
          )}
          <View className="flex flex-row justify-center align-center">
            <Image
              source={require('../../../assets/img/logoHeader.png')}
              resizeMode="contain"
              className="w-8 h-8"
            />
          </View>

          {props.route.name === 'Home' ||
          props.route.name === 'HomeClienteScreen' ? (
            <View className="flex-row items-center gap-2">
              <TouchableOpacity onPress={() => navigate('NotificacoesScreen')}>
                <Image
                  source={require('../../../assets/img/icons/notificacao.png')}
                />
              </TouchableOpacity>
              {tipoUser === 'cliente' && (
                <TouchableOpacity
                  onPress={() => navigate('FiltroCidadeScreen')}
                >
                  <Image
                    source={require('../../../assets/img/icons/local-cidade.png')}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => navigate('FiltrosScreen')}>
                <Image
                  source={require('../../../assets/img/icons/filter.png')}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="opacity-0">
              <Image source={require('../../../assets/img/icons/filter.png')} />
            </View>
          )}
        </View>
      </View>
    </>
  );
}
