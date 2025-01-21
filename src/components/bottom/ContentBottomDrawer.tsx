
import React from 'react'
import { colors } from '../../styles/colors'
import { useNavigate } from '../../hooks/useNavigate'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import ItemDrawer from './ItemDrawer';

export default function ContentBottomDrawer(props: any) {
  const { navigate } = useNavigate();

  return (
    <View className='absolute bottom-0 flex-row justify-around items-center z-50 w-full ' style={{ backgroundColor: colors.secondary50, height: 82 }}>
      <ItemDrawer
        titulo='Home'
        onPress={() => navigate('Home')}
        imagem={require('../../../assets/img/icons/house.png')}
      />
      <ItemDrawer
        titulo='Favoritos'
         onPress={() => navigate('Favoritos')}
        imagem={require('../../../assets/img/icons/favoritos.png')}
      />
      <ItemDrawer
        titulo='Utilizados'
         onPress={() => navigate('Utilizados')}
        imagem={require('../../../assets/img/icons/utilizados.png')}
      />
    </View>
  );
}
