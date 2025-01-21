import { Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { colors } from '../../../styles/colors'
import SemAuthMenuItem from './SemAuthMenuItem'
import { useNavigate } from '../../../hooks/useNavigate'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useGlobal } from '../../../context/GlobalContextProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalTemplateLoginAnunciante from '../../../components/Modals/ModalTemplateLoginAnunciante'
import ModalTemplateLogin from '../../../components/Modals/ModalTemplateLogin'

export function SemAuthCustomDrawerContent(props: any) {
  const { tipoUser } = useGlobal()
  const { navigate } = useNavigate()
  const [modalLoginAnunciante, setModalLoginAnunciante] = useState(false)
  const [modalLoginCliente, setModalLoginCliente] = useState(false)

  async function getStorage() {
    const jsonValue = await AsyncStorage.getItem('dados-perfil')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
    }
  }

  function closeMenu() {
    // props.navigation.closeDrawer()
    if (tipoUser == 'Anunciante') {
      setModalLoginAnunciante(true)
    } else {
      setModalLoginCliente(true)
    }
  }

  useEffect(() => {
    getStorage()
  }, [])

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.6)', marginTop: 0, paddingTop: 0 }}>

      <ModalTemplateLoginAnunciante visible={modalLoginAnunciante} onClose={() => setModalLoginAnunciante(false)} />

      {tipoUser == 'Anunciante' ?
        <ModalTemplateLoginAnunciante visible={modalLoginAnunciante} onClose={() => setModalLoginAnunciante(false)} />
        :
        <ModalTemplateLogin visible={modalLoginCliente} onClose={() => setModalLoginCliente(false)} />
      }

      <View className='p-3 mr-4 rounded-r-3xl flex-1' style={{ backgroundColor: '#F7F2F9' }} >

        <View className='pl-4 py-2 pr-2 mb-8'>
          <Text
            style={{ color: '#49454f' }}
            className='text-base font-medium leading-6'
          >Discontapp</Text>
        </View>

        {tipoUser === 'Anunciante' ?
          <>
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Tipos de Pacotes'
              icon={require('../../../../assets/img/icons/cart.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Meu Consumo'
              icon={require('../../../../assets/img/icons/money.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Perfil'
              icon={require('../../../../assets/img/icons/perfil-menu.png')}
            />
            <SemAuthMenuItem
              titulo='Localização'
              onPress={closeMenu}
              icon={require('../../../../assets/img/icons/estabelecimento.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Documentos'
              icon={require('../../../../assets/img/icons/doc.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Contato'
              icon={require('../../../../assets/img/icons/faq.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='FAQ'
              icon={require('../../../../assets/img/icons/question-out.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Configurações'
              icon={require('../../../../assets/img/icons/settings.png')}
            />
            <SemAuthMenuItem
              onPress={() => navigate('LoginScreen')}
              titulo='Sair'
              icon={require('../../../../assets/img/icons/logout.png')}
            />
          </>
          :
          <>
            <View className=' rounded-2xl' style={{ backgroundColor: colors.secondary80 }}>
              <SemAuthMenuItem
                titulo='Discontoken'
                onPress={closeMenu}
                icon={require('../../../../assets/img/icons/star-discontoken.png')}
              />
            </View>

            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Sugerir Estabelecimentos'
              icon={require('../../../../assets/img/icons/estabelecimento.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Configurações'
              icon={require('../../../../assets/img/icons/settings.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Documentos'
              icon={require('../../../../assets/img/icons/doc.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Contato'
              icon={require('../../../../assets/img/icons/faq.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='FAQ'
              icon={require('../../../../assets/img/icons/question-out.png')}
            />
            <SemAuthMenuItem
              onPress={closeMenu}
              titulo='Perfil'
              icon={require('../../../../assets/img/icons/perfil-menu.png')}
            />
            <SemAuthMenuItem
              onPress={() => navigate('LoginScreen')}
              titulo='Sair'
              icon={require('../../../../assets/img/icons/logout.png')}
            />
          </>
        }

      </View>
    </DrawerContentScrollView>
  );
}
