import React from 'react'
import { colors } from '../../styles/colors'
import { useNavigate } from '../../hooks/useNavigate'
import { View, Text, TouchableOpacity, Image } from 'react-native'

export default function HeaderTab(props: any) {
  const { goBack, navigate } = useNavigate();
  function handleGoBack() {
    goBack();
  }

  return (
    <>
      <View className='flex-1 '>
        <View className="flex flex-row justify-between items-center h-16 w-full px-4" style={{ backgroundColor: colors.secondary50 }}>
          {props.route.name != 'HomeScreen' && props.route.name === 'FiltroLocalizacaoScreen' || props.route.name === 'FiltroDetalheLocalizacaoScreen' || props.route.name === 'FiltroAvaliacoesScreen' || props.route.name === 'FiltroOfertasScreen' || props.route.name === 'FiltroCuponVigenteScreen' ?
            <TouchableOpacity onPress={() => navigate('FiltrosScreen')}>
              <Image source={require('../../../assets/img/icons/seta-esquerda-white.png')} />
            </TouchableOpacity>
            : props.route.name === 'HomeScreen' ?
              <TouchableOpacity className='p-2' onPress={() => props.navigation.toggleDrawer()}>
                <Image source={require('../../../assets/img/icons/menu-white.png')} />
              </TouchableOpacity>
              : props.route.name === 'AlterarSenhaScreen' ?
                <TouchableOpacity className='p-2' onPress={() => navigate('ConfiguracoesScreen')}>
                  <Image source={require('../../../assets/img/icons/seta-esquerda-white.png')} />
                </TouchableOpacity>
                :
                <TouchableOpacity className='p-2' onPress={handleGoBack}>
                  <Image source={require('../../../assets/img/icons/seta-esquerda-white.png')} />
                </TouchableOpacity>
          }

          <View className="flex flex-row justify-center align-center">
            <Text className='text-center text-xl font-medium' style={{ color: colors.white }}>
              {props.route.name == 'HomeScreen'
                ? 'Discontapp'
                : props.options.headerTitle
              }
            </Text>
          </View>

          {props.route.name == 'HomeScreen' ?
            <TouchableOpacity onPress={() => navigate('FiltrosScreen')}>
              <Image source={require('../../../assets/img/icons/filter.png')} />
            </TouchableOpacity>
            :
            <View className='opacity-0' >
              <Image source={require('../../../assets/img/icons/filter.png')} />
            </View>
          }
        </View>
      </View>
    </>
  );
}
