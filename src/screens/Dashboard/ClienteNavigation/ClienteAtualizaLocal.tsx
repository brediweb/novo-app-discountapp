import { api } from '../../../service/api'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { colors } from '../../../styles/colors'
import H5 from '../../../components/typography/H5'
import H3 from '../../../components/typography/H3'
import MapView, { Marker } from 'react-native-maps'
import { useIsFocused } from '@react-navigation/native'
import { useNavigate } from '../../../hooks/useNavigate'
import Geolocation from '@react-native-community/geolocation'
import { requestForegroundPermissionsAsync } from 'expo-location'
import FilledButton from '../../../components/buttons/FilledButton'
import { View, Platform, PermissionsAndroid } from 'react-native'
import HeaderPrimary from '../../../components/header/HeaderPrimary'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'

interface ILocalizacao {
  latitude: number
  longitude: number
}

export default function ClienteAtualizaLocal() {
  const { goBack } = useNavigate()
  const isFocused = useIsFocused()
  const [regiao, setRegiao] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [inputLatitude, setInputLatitude] = useState('')
  const [inputLongitude, setInputLongitude] = useState('')
  const [localizacao, setLocalizacao] = useState<ILocalizacao>({
    latitude: 0,
    longitude: 0
  })
  const [localizacaoGPS, setLocalizacaoGPS] = useState<any>()
  const [permission, setPermission] = useState<any>(null)


  async function postPerfil() {
    setLoading(true)
    if (!regiao?.latitude || !regiao?.longitude) {
      Toast.show({
        type: 'error',
        text1: 'É necessário informar uma localização!',
      })
      setLoading(false)
      return;
    }
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const formData = {
          latitude: inputLatitude,
          longitude: inputLongitude
        }
        const response = await api.post(`/altera/anunciante`,
          formData,
          { headers }
        )
        setInputLatitude('')
        setInputLongitude('')
        Toast.show({
          type: 'success',
          text1: response.data.message ?? 'Localização atualizada com sucesso!',
        })
        goBack()
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Ocorreu algum erro, tente novamente!',
        })
        console.log("Error: ", error.response.data)
      }
    }
    setLoading(false)
  }

  async function getPerfil() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')

    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)

      try {
        const response = await api.get(`/perfil/pessoa-juridica/${newJson.id}`)
        const latitudeFormatada = parseFloat(response.data.results.latitude)
        const longitudeFormatada = parseFloat(response.data.results.longitude)
        setLocalizacao({
          latitude: latitudeFormatada,
          longitude: longitudeFormatada
        })
      } catch (error: any) {
        console.log('Erro detalhes perfil(Localização): ', error.response.data)
      }
    }
    setLoading(false)
  }

  function getLocalizacao() {
    Geolocation.getCurrentPosition(info => {
      setLocalizacaoGPS({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      })
    })
  }

  async function getVerifica() {
    const { granted } = await requestForegroundPermissionsAsync()
    console.log('Verifica:', granted)
  }

  async function getPermissionIOS() {
    try {
      const { granted } = await requestForegroundPermissionsAsync()
      console.log('Permissão', granted)
    } catch (error: any) {
      console.log('ERRO: ', error);
    }
  }

  async function getPermissionAndroid() {
    Platform.OS === 'android' ?
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        if (granted.toString() == 'granted') {
          setPermission(true)
        } else {
          setPermission(false)
        }
        console.log('Permissão', granted);
      }).catch(error => {
        console.log('Erro', error);
      }) : console.log('Plataforma não é android');

  }

  useEffect(() => {
    setInputLatitude(regiao?.latitude)
    setInputLongitude(regiao?.longitude)
  }, [regiao])

  useEffect(() => {
    getPerfil()
  }, [isFocused])

  useEffect(() => {
    getVerifica()
    getLocalizacao()
    if (Platform.OS === 'ios') {
      getPermissionIOS()
    } else {
      getPermissionAndroid()
    }
  }, [])

  return (
    <MainLayoutAutenticado loading={loading} marginTop={0} marginHorizontal={0}>
      <HeaderPrimary titulo='Atualizar empreendimento' />
      <View className='flex-1 h-[60vh] w-full mt-4'>
        <View className='my-4 mx-6'>
          <H5>Clique em qualquer parte do mapa e arraste para posição desejada</H5>
        </View>
        {localizacaoGPS &&
          <MapView
            initialRegion={{
              latitudeDelta: 0.200,
              longitudeDelta: 0.200,
              latitude: localizacaoGPS?.latitude,
              longitude: localizacaoGPS?.longitude,
            }}
            zoomEnabled
            loadingEnabled
            showsTraffic={false}
            zoomTapEnabled={true}
            showsBuildings={false}
            className='w-full h-full'
            onPress={(event) => setRegiao(event.nativeEvent.coordinate as any)}
          >
            {regiao &&
              <Marker
                coordinate={{
                  latitude: regiao.latitude,
                  longitude: regiao.longitude
                }}
                draggable
                pinColor={'#5D35F1'}
                anchor={{ x: 0.69, y: 1 }}
                title='Nova localização marcada'
                centerOffset={{ x: -18, y: -60 }}
              />
            }
          </MapView>
        }
        {!localizacao &&
          <View className='mx-4 mt-12'>
            <H3 align={'center'} color={colors.error30}>Para visualizar o mapa, é preciso conceder acesso à sua localização. Por favor, vá para as configurações do dispositivo e habilite o acesso à localização.</H3>
          </View>
        }
        {permission === false &&
          <View className='mx-4 mt-12'>
            <H3 align={'center'} color={colors.error30}>Para visualizar o mapa, é preciso conceder acesso à sua localização. Por favor, vá para as configurações do dispositivo e habilite o acesso à localização.</H3>
          </View>
        }
      </View>
      {localizacaoGPS &&
        <View className='mt-6 mx-6'>
          <FilledButton
            title='Atualizar'
            onPress={postPerfil}
            disabled={inputLatitude?.length <= 4 || inputLatitude?.length <= 4 ? true : false}
          />
        </View>
      }
    </MainLayoutAutenticado >
  );
}
