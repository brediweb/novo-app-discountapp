import { api } from '../../../service/api'
import { useEffect, useState } from 'react'
import IcoClose from '../../../svg/IcoClose'
import Toast from 'react-native-toast-message'
import Loading from '../../../components/Loading'
import H3 from '../../../components/typography/H3'
import { BarCodeScanner } from 'expo-barcode-scanner'
import IcoCloseWhite from '../../../svg/IcoCloseWhite'
import { useIsFocused } from '@react-navigation/native'
import { useNavigate } from '../../../hooks/useNavigate'
import FilledButton from '../../../components/buttons/FilledButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ButtonPrimary from '../../../components/buttons/ButtonPrimary'
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native'

export default function CameraScreen() {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [scanned, setScanned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataValue, setDataValue] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [hasPermission, setHasPermission] = useState(null)

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission()
  }, [])

  useEffect(() => {
    setScanned(false)
    askForCameraPermission()
  }, [isFocused])

  useEffect(() => {
    if (scanned) {
      console.log('valor', dataValue)
    }
  }, [scanned])

  const handleStatusCodigo = () => {
    setDataValue('')
    setScanned(false)
  }

  const handleBackCamera = () => {
    setScanned(false)
    setDataValue('')
    navigate('ClienteUtilizadosScreen')
  }

  // Ask for permission to use the cam
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission((status === 'granted') as any);
    })();
  }

  async function onSubmit() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')

    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)

      // Filtro id
      const coidgoBruto: string = dataValue
      const partes: string[] = coidgoBruto.split("-")

      const formdata = {
        cliente_id: partes[1],
        codigo: partes[0]
      }
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const response = await api.post(`/valida-codigo`, formdata, { headers })
        Toast.show({
          type: 'success',
          text1: 'Cupom consumido com suceeso',
        })
        setModalVisible(true)
      } catch (error: any) {
        console.log(error.response.data)
        Toast.show({
          type: 'error',
          text1: error.response.data.message ?? 'Ocorreu um erro, tente novamente!',
        })
      }
    }
    setLoading(false)
  }

  function closeModal() {
    setModalVisible(false)
    navigate('ClienteUtilizadosScreen')
    setDataValue('')
  }

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setDataValue(data);
  }

  //check permission and return the screens
  if (hasPermission === null) {
    return <View className='flex-1 items-center justify-center'>
      <Loading />
      <Text>Solicitando permissão da câmera</Text>
    </View>
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>Sem acesso a Câmera</Text>
        <ButtonPrimary handler={() => null}>Permitir Acesso</ButtonPrimary>
      </View>
    )
  }

  return (
    <>
      {loading && <Loading />}
      <Modal visible={modalVisible} animationType='slide'>
        <View className='flex-1 items-center justify-center bg-black'>
          <View className='relative rounded-lg bg-white mx-6 px-4 py-24'>
            <TouchableOpacity onPress={closeModal} className='absolute right-4 top-4'>
              <Image source={require('../../../../assets/img/icons/close.png')} />
            </TouchableOpacity>

            <View className='my-4 mx-8 items-center'>
              <H3 align={'center'}>Código validado com sucesso!</H3>
              <Image className='mt-4' source={require('../../../../assets/img/cliente/coidog-auxiliar.png')} />
            </View>
          </View>
        </View>
      </Modal >
      <View className='w-full flex-1 bg-[#fff]'>
        <View className='flex-1 flex-row w-full absolute top-8 left-6 z-50 justify-start items-center'>
          <View className='flex-row items-center'>
            <TouchableOpacity onPress={handleBackCamera} className='bg-[#6750A4] items-center justify-center rounded-full h-12 w-12 mr-3'>
              <IcoCloseWhite />
            </TouchableOpacity>
          </View>
        </View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}
        />
        {scanned &&
          <View className='absolute bottom-36 bg-[#E5DEFF] h-20 w-full items-center justify-center'>
            <TouchableOpacity onPress={handleStatusCodigo} className='absolute right-3 top-2 rounded-full'>
              <IcoClose />
            </TouchableOpacity>
            <View className='relative'>
              <Text className='text-center'>
                {`Código encontrado e código do cliente`}
              </Text>
              <Text className='text-center font-bold text-lg'>
                {`${dataValue}`}
              </Text>
            </View>
          </View>
        }

        <View className='flex-1 flex-row w-full absolute bottom-20 z-50 justify-center items-center'>
          <View className='flex-row items-center'>
            <View className='w-48'>
              <FilledButton
                title='Continuar'
                onPress={onSubmit}
                disabled={dataValue ? false : true}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
