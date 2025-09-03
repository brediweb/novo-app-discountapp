import React from 'react'
import H5 from '../../../components/typography/H5'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigate } from '../../../hooks/useNavigate'
import ButtonPerfil from '../../../components/buttons/ButtonPerfil'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'
import { colors } from '../../../styles/colors'

export default function ClientePerfilScreen() {
  const { navigate } = useNavigate()

  return (
    <MainLayoutAutenticado notScroll marginTop={80} marginHorizontal={16}>
      <ButtonPerfil
        title='Perfil'
        fontsize={24}
        onPress={() => { }}
        image={require('../../../../assets/img/icons/edit.png')}
      />
      <View className='mt-6'>
        <ScrollView>

          <TouchableOpacity
            style={{
              backgroundColor: colors.primary80
            }}
            onPress={() => navigate('ClientePerfilTrocarFotoScreen')}
            className=' rounded-xl shadow-2xl my-2 px-4 py-6'>
            <H5 color={colors.blackdark}>Trocar foto</H5>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary80
            }}
            onPress={() => navigate('ClientePerfilInformacoesScreen')}
            className=' rounded-xl shadow-2xl my-2 px-4 py-6'>
            <H5 color={colors.blackdark}>Atualizar informações</H5>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary80
            }}
            onPress={() => navigate('ClientePerfilCategoriaScreen')}
            className=' rounded-xl shadow-2xl my-2 px-4 py-6'>
            <H5 color={colors.blackdark}>Atualizar categoria</H5>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary80
            }}
            onPress={() => navigate('FormAtualizarHorarioScreen')}
            className=' rounded-xl shadow-2xl my-2 px-4 py-6'>
            <H5 color={colors.blackdark}>Atualizar horários de funcionamento</H5>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </MainLayoutAutenticado>
  );
}
