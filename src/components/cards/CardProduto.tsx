import Loading from '../Loading'
import H3 from '../typography/H3'
import { api } from '../../service/api'
import { Linking, ScrollView } from 'react-native'
import Caption from '../typography/Caption'
import { colors } from '../../styles/colors'
import QRCode from 'react-native-qrcode-svg'
import LottieView from 'lottie-react-native'
import Toast from 'react-native-toast-message'
import Paragrafo from '../typography/Paragrafo'
import IcoFavorita from '../../svg/IcoFavorita'
import React, { useEffect, useState } from 'react'
import FilledButton from '../buttons/FilledButton'
import ModalTemplate from '../Modals/ModalTemplate'
import ButtonOutline from '../buttons/ButtonOutline'
import { useNavigate } from '../../hooks/useNavigate'
import { useIsFocused } from '@react-navigation/native'
import IcoFavoritaAtivo from '../../svg/IcoFavoritaAtivo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, TouchableOpacity, Text, Image, Modal, Dimensions } from 'react-native'
import { useGlobal } from '../../context/GlobalContextProvider'
import MapView, { Marker } from 'react-native-maps'

interface PropsProduto {
  qr_code?: any
  id_oferta: any
  foto_user?: any
  categoria?: any
  imagem_capa?: any
  get_produtos?: any
  id_anunciante?: any
  vantagem_reais?: any
  nome_filial?: string
  nome_empresa?: string
  nome_produto?: string
  data_validade?: string
  total_avaliacao?: string
  media_avaliacao?: string
  status_favorito?: boolean
  vantagem_porcentagem?: any
  descricao_simples?: string
  descricao_completa?: string
  dados_gerais?: any
}

interface HorariosProps {
  [key: string]: {
    fechado: boolean
    horario_abertura: string
    horario_abertura_almoco: string
    horario_fechamento: string
    horario_fechamento_almoco: string
  }
}

export default function CardProduto(
  {
    qr_code,
    foto_user,
    categoria,
    id_oferta,
    nome_filial,
    dados_gerais,
    imagem_capa,
    nome_empresa,
    get_produtos,
    nome_produto,
    id_anunciante,
    data_validade,
    vantagem_reais,
    total_avaliacao,
    status_favorito,
    media_avaliacao,
    descricao_simples,
    descricao_completa,
    vantagem_porcentagem,
  }: PropsProduto) {

  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const { usuarioLogado } = useGlobal()
  const [loading, setLoading] = useState(false)
  const [dadosUser, setDadosUser] = useState<any>([])
  const [modalSemAuth, setModalSemAuth] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalSucesso, setModalSucesso] = useState(false)
  const [modalVisibleProduto, setModalVisibleProduto] = useState(false)
  const [modalInfosAnunciante, setModalInfosAnunciante] = useState(false)
  const [modalVisibleDetalhes, setModalVisibleDetalhes] = useState(false)
  const [listaHorarios, setListaHorarios] = useState<HorariosProps>({})
  const [cupomUsado, setCupomUsado] = useState(false)
  const [depoimentos, setDepoimentos] = useState<any[]>([])

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setModalSucesso(false)
  }

  const handleCloseModalSucesso = () => {
    setModalVisible(false)
    setModalSucesso(false)
    navigate('AvaliacaoScreen', { id_anunciante: id_anunciante, id_oferta: id_oferta, dados_gerais })
  }

  const handleCloseModalVoltar = () => {
    setModalVisible(false)
    setModalSucesso(false)
  }

  const handleLogin = () => {
    setModalVisible(false)
    setModalSucesso(false)
    navigate('LoginClienteScreen')
  }

  const handleCadastro = () => {
    setModalVisible(false)
    setModalSucesso(false)
    navigate('FormPessoaFisicaScreen')
  }

  const getInitials = (fullName: string = ''): string => {
    const names = fullName.trim().split(' ').filter(Boolean);
    if (names.length === 0) return '';
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  async function postFavorito() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const response = await api.post(`/favorito`, {
          oferta_id: id_oferta
        }, { headers })
        Toast.show({
          type: 'success',
          text1: response.data.message ?? 'Favoritado com sucesso !',
        })
        get_produtos()
      } catch (error: any) {
        console.error('ERROR Favoritar Oferta: ', error)
      }
    }
    setLoading(false)
  }

  async function removeFavorito() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const response = await api.delete(`/favorito/destroy`, {
          headers,
          data: { oferta_id: id_oferta }
        })
        Toast.show({
          type: 'success',
          text1: response.data.message ?? 'Favoritado com sucesso !',
        })
        get_produtos()
      } catch (error: any) {
        console.error('ERROR Favoritar Oferta: ', error.response.data)
      }
    }
    setLoading(false)
  }

  async function geraCupom() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      setDadosUser(newJson)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const response = await api.post(`/gera-cupom`, {
          idOferta: id_oferta
        }, { headers })
        console.log(response.data);

        handleOpenModal()
      } catch (error: any) {
        if (error.response.data.message === 'Você já utilizou esse cupom.') {
          setCupomUsado(true)
        }
        console.error('ERROR POST Gera Cupom: ', error.response.data.message)
        // Toast.show({
        //   type: 'error',
        //   text1: error.response.data.message ?? 'Ocorreu um erro, tente novamente!',
        // })
      }
    }
    setLoading(false)
  }

  // Hook para verificar cupom e encerrar o loop corretamente
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    async function getVerifica() {
      try {
        const jsonValue = await AsyncStorage.getItem('infos-user');
        if (jsonValue) {
          const newJson = JSON.parse(jsonValue);
          setDadosUser(newJson);
          const headers = {
            Authorization: `Bearer ${newJson.token}`,
          };
          const response = await api.get(`/meus-cupoms/verificar?idOferta=${id_oferta}`, { headers });
          if (response.data.results.verificado) {
            if (intervalId) clearInterval(intervalId);
            setModalVisible(false);
            setModalSucesso(true);
          }
        }
      } catch (error: any) {
        console.error('Error GET Verificar:', error?.response?.data);
      }
    }

    if (modalVisible) {
      intervalId = setInterval(getVerifica, 4000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [modalVisible, id_oferta]);

  function formatarTelefone(telefone: string = ''): string {
    // Remove tudo que não for número
    const apenasNumeros = telefone.replace(/\D/g, '');

    // Verifica se tem DDD (11 dígitos ou mais)
    if (apenasNumeros.length >= 10) {
      const ddd = apenasNumeros.slice(0, 2);
      const numero = apenasNumeros.slice(2);

      if (numero.length === 9) {
        // Ex: (91) 91234-5678
        return `(${ddd}) ${numero.slice(0, 5)}-${numero.slice(5)}`;
      } else if (numero.length === 8) {
        // Ex: (91) 1234-5678
        return `(${ddd}) ${numero.slice(0, 4)}-${numero.slice(4)}`;
      }
    }

    // Se não tem DDD ou é inválido, retorna apenas os últimos dígitos com hífen se possível
    if (apenasNumeros.length === 9) {
      return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5)}`;
    } else if (apenasNumeros.length === 8) {
      return `${apenasNumeros.slice(0, 4)}-${apenasNumeros.slice(4)}`;
    }

    return telefone; // Se não couber em nenhum caso, retorna como veio
  }

  async function getHorarios() {
    try {
      const response = await api.get(`/horarios-funcionamento?user_id=${dados_gerais.user_id}`);
      // A API retorna horarios como um array, então pegamos o primeiro elemento     
      if (response.data.results?.horarios && Array.isArray(response.data.results.horarios) && response.data.results.horarios.length > 0) {
        setListaHorarios(response.data.results.horarios[0])
      } else if (response.data.results?.horarios && !Array.isArray(response.data.results.horarios)) {
        // Caso não seja array, usa diretamente
        setListaHorarios(response.data.results.horarios)
      }
    } catch (error: any) {
      try {
        const response = await api.get(`/horarios-funcionamento?user_id=${id_anunciante}`);
        // A API retorna horarios como um array, então pegamos o primeiro elemento     
        console.log(nome_empresa, 'id_anunciante', response.data);

        if (response.data.results?.horarios && Array.isArray(response.data.results.horarios) && response.data.results.horarios.length > 0) {
          setListaHorarios(response.data.results.horarios[0])
        } else if (response.data.results?.horarios && !Array.isArray(response.data.results.horarios)) {
          // Caso não seja array, usa diretamente
          setListaHorarios(response.data.results.horarios)

        }
      } catch (error: any) {
        console.error('ERROR GET Horarios: ', error.response?.data || error)
      }
      console.error('ERROR GET Horarios 2: ', nome_empresa, error.response?.data || error)
    }
  }

  async function getDepoimentos() {
    try {
      const jsonValue = await AsyncStorage.getItem('infos-user');
      if (jsonValue) {
        const newJson = JSON.parse(jsonValue);
        setDadosUser(newJson);
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        };
        const response = await api.get(`/avaliacoes/${id_anunciante}`, { headers });
        if (response.data.results?.depoimentos && Array.isArray(response.data.results.depoimentos)) {
          setDepoimentos(response.data.results.depoimentos);
        }
      }
    } catch (error: any) {
      console.error('ERROR GET Depoimentos: ', error.response?.data || error)
    }
  }


  const isDiaFechado = (dia: any): boolean => {
    // Se não existe o objeto do dia, considera fechado
    if (!dia) return true;

    // Se fechado é true, está fechado
    if (dia.fechado === true) return true;

    // Se todos os horários estão vazios ou são apenas '-', considera fechado
    const horarioAbertura = dia.horario_abertura?.trim() || '';
    const horarioFechamento = dia.horario_fechamento?.trim() || '';
    const horarioAberturaAlmoco = dia.horario_abertura_almoco?.trim() || '';
    const horarioFechamentoAlmoco = dia.horario_fechamento_almoco?.trim() || '';

    const todosVazios =
      (!horarioAbertura || horarioAbertura === '-') &&
      (!horarioFechamento || horarioFechamento === '-') &&
      (!horarioAberturaAlmoco || horarioAberturaAlmoco === '-') &&
      (!horarioFechamentoAlmoco || horarioFechamentoAlmoco === '-');

    return todosVazios;
  }

  const formatarHorario = (dia: any): string => {
    if (isDiaFechado(dia)) {
      return 'Fechado';
    }

    const horarioAbertura = dia?.horario_abertura || '';
    const horarioFechamento = dia?.horario_fechamento || '';
    const horarioAberturaAlmoco = `${dia?.horario_abertura_almoco ? `${dia?.horario_abertura_almoco} -` : ''}` || '';
    const horarioFechamentoAlmoco = `${dia?.horario_fechamento_almoco ? `- ${dia?.horario_fechamento_almoco}` : ''}` || '';

    return `${horarioAbertura} ${horarioFechamentoAlmoco} até ${horarioAberturaAlmoco} ${horarioFechamento}`;
  }

  const abrirNoMaps = (endereco: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    getHorarios()
    getDepoimentos()
  }, [])

  return (

    <>
      {loading && <Loading />}
      <ModalTemplate visible={modalSucesso} onClose={handleCloseModalSucesso} width={'100%'}>
        <View className='w-full justify-center items-center h-full'>
          <LottieView style={{ width: 120, height: 120 }} source={require('../../animations/cupom-validado.json')} autoPlay loop />
          <H3 color={colors.secondary70} align={'center'}>Cupom validado com sucesso !!!</H3>
          <View className='w-52 mt-6'>
            <ButtonOutline title='Avaliar anunciante' onPress={handleCloseModalSucesso} />
            <View className='w-full h-4' />
            <ButtonOutline
              title='Voltar'
              backgroundColor={'transparent'}
              border
              color={colors.secondary}
              onPress={handleCloseModalVoltar}
            />
          </View>
        </View>
      </ModalTemplate>
      <ModalTemplate visible={modalSemAuth} onClose={() => setModalSemAuth(false)} width={'100%'}>
        <View className='w-full justify-center items-center h-full'>
          <H3 color={colors.secondary70} align={'center'}>Faça login ou crie uma conta para acessar essa funcionalidade</H3>
          <View className='w-52 mt-6'>
            <ButtonOutline title='Criar conta' onPress={handleCadastro} />
            <View className='mt-2'>
              <ButtonOutline title='Fazer login' onPress={handleLogin} />
            </View>
          </View>
        </View>
      </ModalTemplate>
      <Modal visible={modalVisible} animationType='slide' transparent >
        <View className='flex-1 w-full justify-center items-center' style={{ backgroundColor: 'rgba(52, 52, 52, 0.5)' }}>
          <View className='rounded-lg bg-white'>
            <TouchableOpacity onPress={handleCloseModal} className='items-end mt-3 mr-3'>
              <Image source={require('../../../assets/img/icons/close.png')} />
            </TouchableOpacity>
            <View className='mx-4 my-4'>
              <Paragrafo align={'center'} title='Utilize o QR CODE abaixo para validar no estabelecimento 123 (caixa)' />
              {modalSucesso === false &&
                <View className='mx-auto'>
                  <LottieView style={{ width: 120, height: 120 }} source={require('../../animations/buscando.json')} autoPlay loop />
                </View>
              }
              <View className='mx-auto my-6'>
                <QRCode
                  size={120}
                  logoSize={30}
                  value={`${qr_code}-${dadosUser.id}`}
                  logoBackgroundColor='transparent'
                />
              </View>
              <Caption align={'center'} fontSize={12}>
                CÓDIGO AUXILIAR
              </Caption>
              <Caption align={'center'} fontSize={14} fontWeight={'bold'}>
                {qr_code ?? "Falha ao exibir código"}
              </Caption>
              <View className='h-3'></View>
              <Caption align={'center'} fontSize={12}>
                CÓDIGO CLIENTE
              </Caption>
              <Caption align={'center'} fontSize={14} fontWeight={'bold'}>
                {dadosUser.id ?? "Falha ao exibir o código"}
              </Caption>

            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modalVisibleDetalhes} animationType='slide' transparent>
        <View className='flex-1 w-full ' style={{ backgroundColor: 'rgba(52, 52, 52, 0.5)' }}>
          <View className='flex-1  bg-white pt-4 my-20 mx-4 rounded-lg'>
            <TouchableOpacity onPress={() => setModalVisibleDetalhes(false)} className='flex-row w-full px-2'>
              <Image source={require('../../.././assets/img/icons/seta-esquerda.png')} />
              <H3>Detalhes da oferta</H3>
            </TouchableOpacity>
            <ScrollView className='my-4 px-4'>
              <Caption fontSize={12} >
                {descricao_completa}
              </Caption>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal visible={modalVisibleProduto} animationType='slide' >
        <View className='flex-1 w-full ' style={{ backgroundColor: colors.blackbase }}>
          <View className='flex-1 justify-between my-20 mx-2 rounded-lg'>
            <TouchableOpacity onPress={() => setModalVisibleProduto(false)} className='flex-row w-full px-2'>
              <Image className='rounded-xl' source={require('../../.././assets/img/icons/seta-esquerda-white.png')} />
            </TouchableOpacity>
            <Image source={{ uri: imagem_capa ?? 'https://api-temp.vercel.app/app-discontapp/produto-capa.png' }} className='w-full h-48 ' resizeMode='cover' />
            <View>
              <ScrollView showsVerticalScrollIndicator={false} className='my-4 px-4 h-32'>
                <Caption color={colors.white} fontSize={12} >
                  {descricao_completa}
                </Caption>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modalInfosAnunciante} animationType='slide' >
        <View className='flex-1 w-full ' style={{ backgroundColor: colors.blackbase }}>
          <View className='flex-1 justify-center my-20 mx-2 rounded-lg'>
            <View className='bg-white mt-4'>
              <ScrollView showsVerticalScrollIndicator={false} className='my-4 px-4'>
                <TouchableOpacity onPress={() => setModalInfosAnunciante(false)} className='w-full rounded-md border-solid border-2 border-[#2F009C] flex justify-center items-center h-12 mb-4 px-2'>
                  <Text className='text-[#2F009C]'>
                    Voltar
                  </Text>
                </TouchableOpacity>
                {/* {depoimentos && depoimentos.length > 0 &&
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setModalInfosAnunciante(false);
                        navigate('ListaDepoimentosScreen');
                      }}
                      className='w-full flex-row justify-between items-center rounded-md h-12'
                    >
                      <Text className='font-bold text-base'>
                        Ver Depoimentos ({depoimentos.length})
                      </Text>
                    </TouchableOpacity>
                  </>
                } */}
                <Caption color={colors.dark} fontWeight={'bold'} fontSize={16} >
                  Nome da Empresa:{' '}
                  <Caption color={colors.dark} fontSize={16} margintop={0} >
                    {nome_empresa}
                  </Caption>
                </Caption>
                <View className='w-full h-4' />

                <Caption fontWeight={'bold'} color={colors.dark} fontSize={16} >
                  Telefone: {' '}
                  <Caption color={colors.dark} fontSize={16} >
                    {formatarTelefone(dados_gerais?.telefone)}
                  </Caption>
                </Caption>
                {dados_gerais.endereco && dados_gerais.endereco.length > 5 &&
                  <>
                    <View className='w-full h-4' />
                    <Caption fontWeight={'bold'} color={colors.dark} fontSize={16} >
                      Endereço: {' '}
                      <Caption color={colors.dark} fontSize={16} margintop={0}>
                        {dados_gerais?.endereco}
                      </Caption>
                    </Caption>
                    <TouchableOpacity onPress={() => abrirNoMaps(dados_gerais.endereco)} className='w-full flex-row justify-between rounded-md bg-[#2F009C] flex items-center h-10 px-2 mt-2'>
                      <Text className='text-white font-bold text-base'>
                        Traçar rota
                      </Text>
                      <Image source={require(`../../../assets/img/icons/icon-mapa.png`)} className='w-7 h-auto' resizeMode='contain' />
                    </TouchableOpacity>
                  </>
                }
                {listaHorarios &&
                  <View className='w-full mt-2'>
                    <Caption color={colors.dark} fontWeight={'bold'} margintop={0} fontSize={16} >
                      Horários:
                    </Caption>
                    <View>
                      <Caption color={colors.dark} fontSize={12} >
                        Segunda-feira: {formatarHorario(listaHorarios?.segunda)}
                      </Caption>
                      <Caption color={colors.dark} fontSize={12} >
                        Terça-feira: {formatarHorario(listaHorarios?.terca)}
                      </Caption>
                      <Caption color={colors.dark} fontSize={12} >
                        Quarta-feira: {formatarHorario(listaHorarios?.quarta)}
                      </Caption>
                      <Caption color={colors.dark} fontSize={12} >
                        Quinta-feira: {formatarHorario(listaHorarios?.quinta)}
                      </Caption>
                      <Caption color={colors.dark} fontSize={12} >
                        Sexta-feira: {formatarHorario(listaHorarios?.sexta)}
                      </Caption>
                      <Caption color={colors.dark} fontSize={12} >
                        Sábado: {formatarHorario(listaHorarios?.sabado)}
                      </Caption>
                      <Caption color={colors.dark} fontSize={12} >
                        Domingo: {formatarHorario(listaHorarios?.domingo)}
                      </Caption>
                    </View>
                  </View>
                }
                {dados_gerais.latitude && dados_gerais.longitude &&
                  <>
                    <View className='w-full h-4' />
                    <Caption fontWeight={'bold'} color={colors.dark} fontSize={16} >
                      Mapa:
                    </Caption>
                    <MapView
                      onPress={() => Linking.openURL(`https://www.google.com/maps/@${dados_gerais.latitude},${dados_gerais.longitude},25z`)}
                      className='w-full h-40 mt-2'
                      initialRegion={{
                        latitude: parseFloat(dados_gerais.latitude),
                        longitude: parseFloat(dados_gerais.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      showsUserLocation={false}
                      showsMyLocationButton={false}
                      loadingEnabled={false}
                      toolbarEnabled={false}
                      onMapReady={() => { }}
                      onError={(error) => {
                        console.log('MapView Error:', error);
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: parseFloat(dados_gerais.latitude),
                          longitude: parseFloat(dados_gerais.longitude),
                        }}
                        draggable={false}
                        pinColor={'#5D35F1'}
                        anchor={{ x: 0.69, y: 1 }}
                        centerOffset={{ x: -18, y: -60 }}
                      />
                    </MapView>
                  </>
                }
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      <View
        className='rounded-t-xl rounded-b-xl drop-shadow-md mx-1.5 mb-3 mt-3'
        style={{
          backgroundColor: '#F7F2F9',
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.40,
          shadowRadius: 4.05,
          elevation: 5,
        }}>
        <View className='flex-row items-center py-3 px-2 mb-3'>
          <View className='flex-row w-full items-center justify-start'>
            {foto_user && foto_user != '-' ?
              <TouchableOpacity className='' onPress={() => setModalInfosAnunciante(true)}>
                <Image source={{ uri: foto_user }} className='h-10 w-10 rounded-full mr-2 ' style={{ backgroundColor: colors.primary40 }} />
              </TouchableOpacity>
              :
              <TouchableOpacity className='' onPress={() => setModalInfosAnunciante(true)}>
                <View className='h-10 w-10 rounded-full items-center justify-center mr-2' style={{ backgroundColor: colors.primary40 }} >
                  <Text className='text-base text-[#fff] font-medium' >
                    {getInitials(nome_empresa ?? 'New User')}
                  </Text>
                </View>
              </TouchableOpacity>
            }
            <View className='flex-row w-full flex justify-start items-center' style={{ maxWidth: '40%' }}>
              <View>
                <TouchableOpacity onPress={() => setModalInfosAnunciante(true)} className='w-full'>
                  {nome_empresa &&
                    <Text className='text-sm text-[#775AFF]'>{nome_empresa}</Text>
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={media_avaliacao && total_avaliacao ? () => navigate('ListaAvaliacaoScreen', { id_anunciante }) : () => setModalInfosAnunciante(true)} className="">
                  {media_avaliacao && total_avaliacao ?
                    <View className='flex flex-row'>
                      <Image source={require('../../../assets/img/icons/star.png')} />
                      <Text className='text-xs text-[#775AFF]'>{media_avaliacao ?? 'Novo'} ({total_avaliacao ?? 'Novo'})</Text>
                    </View>
                    :
                    <Text className='text-xs text-[#6b6b6a]'>Novo anunciante!</Text>
                  }
                </TouchableOpacity >
              </View>
            </View>
            {status_favorito ?
              <TouchableOpacity onPress={removeFavorito} className='absolute right-0'>
                <IcoFavoritaAtivo />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={postFavorito} className='absolute right-0'>
                <IcoFavorita />
              </TouchableOpacity>
            }
          </View>
        </View>
        <TouchableOpacity onPress={() => setModalVisibleProduto(true)} className='w-full'>
          <Image source={{ uri: imagem_capa ?? 'https://api-temp.vercel.app/app-discontapp/produto-capa.png' }} className='w-full h-40' resizeMode='cover' />

          {vantagem_porcentagem && vantagem_porcentagem != '-' &&
            <View className="bg-[#FFB876]">
              <Text className="text-center text-[#9C5706] font-medium text-[16px] py-2 ">
                {vantagem_porcentagem}% de desconto
              </Text>
            </View>
          }
          {vantagem_reais && vantagem_reais != '-' &&
            <View className="bg-[#FFB876]">
              <Text className="text-center text-[#9C5706] font-medium text-[16px] py-2 ">
                R$: {parseFloat(vantagem_reais).toFixed(2).replace('.', ',')} de desconto
              </Text>
            </View>
          }
        </TouchableOpacity>
        <View className="px-2 mt-4 mb-4">
          <View className='bg-[#EEF0FF] border-solid border-[1px] border-[#BFC6FF] px-4 py-1 mb-2 rounded-2xl'>
            <Caption align={'center'}>
              {categoria}
            </Caption>
          </View>
          <Text
            className='text-base font-bold'
          >{nome_produto}</Text>
          <Text
            className='text-sm mb-4'
          >Válido até {data_validade}</Text>
          <Paragrafo color={'#49454F'} title={descricao_simples ?? ''} />
          {/* Valor com desconto em reais */}
          <Text className="text-md">
            De:{' '}
            <Text className="line-through">
              R$ {parseFloat(dados_gerais.valor).toFixed(2).replace('.', ',')}
            </Text>
          </Text>
          <Text className="text-lg">
            Por:{' '}
            <Text className="font-bold">
              {vantagem_reais != '-'
                ? `R$: ${(parseFloat(dados_gerais.valor) - parseFloat(vantagem_reais)).toFixed(2).replace('.', ',')}`
                : `R$: ${(dados_gerais.valor - (dados_gerais.valor * vantagem_porcentagem / 100)).toFixed(2).replace('.', ',')}`
              }
            </Text>
          </Text>
        </View>

      </View>
      <View className={`justify-around items-center py-4 px-4 ${Dimensions.get('window').width > 300 && 'flex-row'}`}>
        <TouchableOpacity onPress={() => setModalVisibleDetalhes(true)} className='px-3 py-[10px]'>
          <Text className='text-sm font-medium text-center' style={{ color: colors.secondary60 }}>Detalhes</Text>
        </TouchableOpacity>
        {!dados_gerais.cupom_utilizado && usuarioLogado &&
          <FilledButton onPress={geraCupom} title='Gerar Cupom' backgroundColor={colors.secondary60} color={colors.white} />
        }
        {dados_gerais.cupom_utilizado &&
          <FilledButton onPress={() => { }} title='Cupom usado' backgroundColor={colors.gray} color={colors.white} />

        }
      </View>
    </>

  )
}



