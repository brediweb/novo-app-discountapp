import { View, Text, Image, LayoutChangeEvent, TouchableOpacity, Modal, Platform, PermissionsAndroid, Linking } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../service/api';
import MainLayoutAutenticado from '../../components/layout/MainLayoutAutenticado';
import MapView, { Marker } from 'react-native-maps';
import H3 from '../../components/typography/H3';
import { colors } from '../../styles/colors';
import { requestForegroundPermissionsAsync } from 'expo-location';
import FilledButton from '../../components/buttons/FilledButton';


export default function DiscotokenListagemScreen() {

    const [cupons, setCupons] = useState([])
    const [cupomAtual, setCupomAtual] = useState({} as any)
    const [isModal, setIsModal] = useState(false)
    const [permissaoLocal, setPermissaoLocal] = useState(false)
    const [mapLayout, setMapLayout] = useState({ width: 0, height: 0 })
    const mapRef = useRef<MapView>(null)

    function handleMapLayout(event: LayoutChangeEvent) {
        const { width, height } = event.nativeEvent.layout
        setMapLayout({ width, height })
    }

    async function getCupons() {
        const jsonValue = await AsyncStorage.getItem('infos-user')
        if (jsonValue) {
            const newJson = JSON.parse(jsonValue)
            try {
                const headers = {
                    Authorization: `Bearer ${newJson.token}`,
                    Accept: 'application/json',
                }
                const response = await api.get(`/discotoken/anunciantes`, { headers })
                setCupons(response.data.results.anunciantes)
            } catch (error: any) {
                console.log('ERROR GET CUPONS ', error)
            }
        }
    }

    function handleCupom(cupom: any) {
        setCupomAtual(cupom)
        console.log(cupom.anunciante)
        setIsModal(true)
    }

    async function getPermissionIOS() {
        try {
            const { granted } = await requestForegroundPermissionsAsync()
            if (granted) {
                setPermissaoLocal(true)
            } else {
                setPermissaoLocal(false)
            }
        } catch (error: any) {
            console.log('ERRO', error);
        }
    }

    async function solicitarPermissaoLocal() {
        if (parseFloat(cupomAtual?.anunciante?.latitude) && parseFloat(cupomAtual?.anunciante?.longitude)) {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Permissão de Localização',
                        message: 'Este aplicativo precisa de permissão para acessar sua localização.',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setPermissaoLocal(true)
                } else {
                    setPermissaoLocal(false)
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }

    useEffect(() => {
        getCupons()
        if (Platform.OS === 'ios') {
            getPermissionIOS()
        }
    }, [])

    return (
        <MainLayoutAutenticado marginTop={64} marginHorizontal={16}>
            {
                cupons.map((cupom: any) =>
                    <TouchableOpacity key={cupom.id} onPress={() => handleCupom(cupom)}>
                        <View style={{ backgroundColor: '#000000' }} className='overflow-hidden flex p-8 pl-12 mt-2 flex-row justify-center items-center h-32'>
                            <View className='absolute -left-4 w-8 h-8 rounded-full bg-white' />
                            <View className='absolute -right-4 w-8 h-8 rounded-full bg-white' />
                            <Image source={{ uri: cupom?.photo }} className='w-24 h-24' />
                            <Image source={require('../../../assets/img/line.png')} className='h-20 ml-4' />
                            <View className='ml-10 w-[56%]'>
                                <Text className='leading-[24px]' style={{ fontFamily: 'Poppins_500Medium', color: 'white', fontSize: 18 }}>{cupom?.anunciante?.nome_fantasia}</Text>
                                <Text className='leading-[64px]' style={{ fontFamily: 'Poppins_600SemiBold', color: 'white', fontSize: 56 }}>{cupom?.anunciante?.vantagem_porcentagem_discotoken}%</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
            <Modal animationType="slide" transparent visible={isModal}>
                <View className='flex-1 bg-white/40'>
                    <View className='absolute bottom-[24vh] border bg-white w-[88vw] self-center rounded-2xl'>
                        <View className='flex flex-row items-center justify-between border-b p-6'>
                            <Text className='text-lg' style={{ fontFamily: 'Poppins_400Regular' }}>Discontoken</Text>
                            <TouchableOpacity onPress={() => setIsModal(false)}>
                                <Image source={require('../../../assets/img/closeButton.png')} className='w-4 h-4' resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                        {!permissaoLocal ?
                            <View className='mx-4 py-6'>
                                <H3 align={'center'} color={colors.error30}>Para visualizar o mapa, é preciso conceder acesso à sua localização. Por favor, vá para as configurações do dispositivo e habilite o acesso à localização.</H3>
                                <View className='mt-4' />
                                <FilledButton onPress={() => solicitarPermissaoLocal()} title='Ir para configurações' />
                            </View>
                            :

                            <View style={{ flex: 1 }}>
                                <MapView
                                    className='mx-auto my-4 w-80 h-80'
                                    region={{
                                        latitude: parseFloat(cupomAtual?.anunciante?.latitude),
                                        longitude: parseFloat(cupomAtual?.anunciante?.longitude),
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}

                                >
                                    <Marker
                                        coordinate={{
                                            latitude: parseFloat(cupomAtual?.anunciante?.latitude),
                                            longitude: parseFloat(cupomAtual?.anunciante?.longitude),
                                        }}
                                        title={cupomAtual?.anunciante?.nome_fantasia}
                                    />
                                </MapView>
                                <View className='pt-2 pb-4 w-full'>
                                    <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps?q=${parseFloat(cupomAtual?.anunciante?.latitude)},${parseFloat(cupomAtual?.anunciante?.longitude)}`)} style={{ backgroundColor: colors.secondary50 }} className='w-48 self-center rounded-full flex flex-row items-center justify-center py-2'>
                                        <Text className='mr-1 text-white text-xl' style={{ fontFamily: 'Poppins_500Medium' }}>Ver local</Text>
                                        <Image source={require('../../../assets/img/icons/local-cidade.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>}
                    </View>
                </View>
            </Modal>
        </MainLayoutAutenticado>
    )
}