import { useState } from 'react'
import Loading from '../../Loading'
import H3 from '../../typography/H3'
import FilledButton from '../FilledButton'
import { api } from '../../../service/api'
import IcoFlash from '../../../svg/IcoFlash'
import Caption from '../../typography/Caption'
import { colors } from '../../../styles/colors'
import IcoCamera from '../../../svg/IcoCamera'
import Toast from 'react-native-toast-message'
import IcoFlashNot from '../../../svg/IcoFlashNot'
import InputOutlined from '../../forms/InputOutlined'
import ModalTemplate from '../../Modals/ModalTemplate'
import IcoCloseWhite from '../../../svg/IcoCloseWhite'
import { useNavigate } from '../../../hooks/useNavigate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Camera, useCameraDevices, CameraPosition } from 'react-native-vision-camera'
import { Dimensions, Image, Modal, TouchableOpacity, View, Text, Keyboard, PermissionsAndroid, Alert, ScrollView } from 'react-native'
import React from 'react'

export default function ButtonsTecladoCamera() {
  const { navigate, goBack } = useNavigate()
  const devices = useCameraDevices() as any
  const [codigo, setCodigo] = useState('')
  const [flashOn, setFlashOn] = useState(false)
  const [loading, setLoading] = useState(false)
  const larguraTela = Dimensions.get('window').width
  const [exibiCodigo, setExibiCodigo] = useState('')
  const [codigoCliente, setCodigoCliente] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [envioSucesso, setEnvioSucesso] = useState(false)
  const [cameraVisible, setCameraVisible] = useState(false)
  const [cameraPostion, setCameraPosition] = useState<CameraPosition>('back')
  const device = cameraPostion === 'front' ? devices.front : devices.back
  console.log(device);

  // if (device == null) return <Loading />


  const handleCamera = () => {
    setCameraVisible(true)
  }

  const handleCloseCamera = () => {
    setCameraVisible(false)
  }

  async function onSubmit() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)

      const formdata = {
        cliente_id: codigoCliente,
        codigo: codigo.toLocaleUpperCase()
      }
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const response = await api.post(`/valida-codigo`, formdata, { headers })
        setEnvioSucesso(true)
        setExibiCodigo(codigo)
        setCodigo('')
        setCodigoCliente('')
      } catch (error: any) {
        console.log(error.response.data)
        Alert.alert('Erro', error.response.data.message ?? 'Revise o código e tente novamente!')
      }
    }
    setLoading(false)
  }

  function closeModal() {
    setCodigo('')
    setCodigoCliente('')
    setModalVisible(false)
    setEnvioSucesso(false)
  }

  function voltaModal() {
    setCodigo('')
    setCodigoCliente('')
    setModalVisible(true)
    setEnvioSucesso(false)
  }

  const handleButtonClick = () => {
    Keyboard.dismiss()
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleCamera()
      } else {
        Toast.show({
          type: 'error',
          text1: 'Precisa conceder permissão para usar a câmera!',
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  function handleCameraPostion() {
    setCameraPosition(prevState => prevState == 'front' ? 'back' : 'front')
  }

  const handleFlash = () => {
    if (cameraPostion === 'front') {
      return Alert.alert('Flash', 'Utilize a câmera traseira para ativar o flash!')
    }
    setFlashOn(!flashOn)
  }

  return (
    <>
      <View className='justify-around bg-white w-full  absolute bottom-0 pb-4 pt-4' style={larguraTela >= 160 ? { flexDirection: 'row', zIndex: 9999 } : { flexDirection: 'column' }}>
        <Modal visible={modalVisible} animationType='slide' className='flex-1 items-center justify-center bg-black/70'>
          {loading &&
            <Loading />
          }
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 320 }}>
            <View className='relative rounded-lg  mx-6 px-4 py-24'>
              <TouchableOpacity onPress={closeModal} className='absolute right-2 top-10'>
                <Image source={require('../../../../assets/img/icons/close.png')} />
              </TouchableOpacity>

              {envioSucesso
                ? <View className='my-4'>
                  <H3 align={'center'}>Código <Text className=' font-bold'>{exibiCodigo}</Text> validado com sucesso!</H3>
                  <View className='flex items-center justify-center'>
                    <Image className='mt-4' source={require('../../../../assets/img/cliente/coidog-auxiliar.png')} />
                  </View>

                  <View className='mt-4'>
                    <FilledButton
                      title='Válidar outro código'
                      onPress={voltaModal}
                    />
                  </View>
                </View>
                : <View className=''>
                  <H3 align={'center'}>Informe as informações necessárias:</H3>

                  <InputOutlined
                    onChange={setCodigo}
                    label='Código: '
                    value={codigo}
                    maxLength={10}
                    keyboardType={'default'}
                  />
                  <InputOutlined
                    onChange={setCodigoCliente}
                    label='Código do Cliente: '
                    value={codigoCliente}
                    maxLength={10}
                    keyboardType={'number-pad'}
                  />

                  <View className='mt-12'>
                    <FilledButton
                      disabled={codigo.length <= 0 ? true : false}
                      title='Válidar Código'
                      onPress={() => onSubmit()}
                    />
                  </View>
                </View>
              }
              <View>
                <FilledButton
                  title='Voltar para o início'
                  backgroundColor={'transparent'}
                  color={colors.secondary50}
                  border
                  onPress={() => goBack()}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
        <ModalTemplate
          closeSecondary={true}
          onClose={handleCloseCamera}
          backgroundColor={'transparent'}
          visible={cameraVisible}
          width={'100%'}
          padding={0}
          backgroundColorSecondary={'transparent'}
        >
          <View className='h-full w-full'>
            <Camera
              style={{ flex: 1 }}
              device={device}
              isActive={true}
              torch={flashOn ? 'on' : 'off'}
            />
            <View className='flex-1 flex-row w-full absolute bottom-6 z-50 justify-center items-center'>
              <View className='flex-row items-center bg-[#C9BFFF] rounded-full px-8 py-2'>
                <TouchableOpacity onPress={handleCloseCamera} className='bg-[#6750A4] items-center justify-center rounded-full h-12 w-12 mr-3'>
                  <IcoCloseWhite />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFlash} className='bg-[#77009A] items-center justify-center rounded-full h-12 w-12 mr-3'>
                  {flashOn ?
                    <IcoFlashNot />
                    :
                    <IcoFlash />
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCameraPostion} className='bg-[#77009A] items-center justify-center rounded-full h-12 w-12'>
                  <IcoCamera />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ModalTemplate>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className='rounded-full w-auto py-3 px-5'
          style={larguraTela >= 160
            ? { borderWidth: 1, borderColor: colors.secondary50 }
            : { borderWidth: 1, borderColor: colors.secondary50, marginBottom: 8, alignItems: 'center' }
          }>
          <Image className='absolute top-2 left-1 ml-2' source={require('../../../../assets/img/icons/comprovante.png')} />
          <View className='ml-4'>
            <Caption fontSize={16} fontWeight={'500'} color={colors.secondary50}>Digitar código</Caption>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className='rounded-full w-auto py-3 px-5'
          onPress={() => navigate('CameraScreen')}
          style={larguraTela >= 160
            ? { borderWidth: 1, borderColor: colors.secondary50, backgroundColor: colors.secondary50 }
            : { borderWidth: 1, borderColor: colors.secondary50, backgroundColor: colors.secondary50, marginBottom: 8, alignItems: 'center' }
          }>
          <Image className='absolute top-2 left-1 ml-2' source={require('../../../../assets/img/icons/camera.png')} />
          <View className='ml-4'>
            <Caption fontSize={16} fontWeight={'500'} color={colors.white}>Abrir câmera</Caption>
          </View>
        </TouchableOpacity>
      </View>
    </>

  )
}
