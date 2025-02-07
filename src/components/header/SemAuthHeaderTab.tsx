import React, { useState } from 'react'
import { colors } from '../../styles/colors'
import ModalTemplateLogin from '../Modals/ModalTemplateLogin'
import { useGlobal } from '../../context/GlobalContextProvider'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import ModalTemplateLoginAnunciante from '../Modals/ModalTemplateLoginAnunciante'

export default function SemAuthHeaderTab(props: any) {
  const { tipoUser } = useGlobal()
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View className='flex-1'>
        {tipoUser == 'Anunciante' ?
          <ModalTemplateLoginAnunciante visible={modalVisible} onClose={() => setModalVisible(false)} />
          :
          <ModalTemplateLogin visible={modalVisible} onClose={() => setModalVisible(false)} />
        }
        <View className="flex flex-row justify-between items-center h-16 w-full px-4" style={{ backgroundColor: colors.secondary50 }}>

          <TouchableOpacity className='p-2' onPress={() => props.navigation.toggleDrawer()}>
            <Image source={require('../../../assets/img/icons/menu-white.png')} />
          </TouchableOpacity>


          <View className="flex flex-row justify-center align-center">
            <Image source={require('../../../assets/img/logoHeader.png')} resizeMode='contain' className='w-8 h-8' />
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={require('../../../assets/img/icons/filter.png')} />
          </TouchableOpacity>

        </View>
      </View>
    </>
  );
}
