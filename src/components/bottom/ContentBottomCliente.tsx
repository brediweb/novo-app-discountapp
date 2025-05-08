
import React from 'react'
import { colors } from '../../styles/colors'
import { useNavigate } from '../../hooks/useNavigate'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import ItemDrawer from './ItemDrawer';

export default function ContentBottomCliente(props: any) {
  const { navigate } = useNavigate();

  return (
    <View className='absolute bottom-0 flex-row justify-around items-center z-50 w-full ' style={{ backgroundColor: colors.secondary50, height: 82 }}>
      <ItemDrawer
        titulo='Home'
        onPress={() => navigate('HomeClienteScreen')}
        imagem={require('../../../assets/img/icons/house.png')}
      />
      <ItemDrawer
        titulo='Anúncio'
        onPress={() => navigate('ClienteCriaCuponScreen')}
        imagem={require('../../../assets/img/icons/plus.png')}
      />
      <ItemDrawer
        titulo='Anúncios'
        onPress={() => navigate('ClienteUtilizadosScreen')}
        imagem={require('../../../assets/img/icons/utilizados.png')}
      />
    </View>
  );
}
