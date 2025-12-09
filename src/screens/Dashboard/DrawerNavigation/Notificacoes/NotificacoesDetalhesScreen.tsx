import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { api } from '../../../../service/api'
import { useIsFocused } from '@react-navigation/native'
import { useNavigate } from '../../../../hooks/useNavigate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HeaderPrimary from '../../../../components/header/HeaderPrimary'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'
import CardDetalheNotificacao from '../../../../components/cards/CardDetalheNotificacao'

interface PropsNotificacao {
  id: any
  data: string
  hora: string
  titulo: string
  descricao: string
}

export default function NotificacoesDetalhesScreen(props: any) {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const idNotificacao = props.route.params.id
  const [listaNotificacao, setListaNotificacao] = useState([])

  async function postVisualiza() {
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const response = await api.post(`/notificacoes`,
          {
            notificacao_id: idNotificacao
          }, { headers })
      } catch (error: any) {
        console.log('ERRO POST Visualiza Notificação: ', error)
      }
    }
  }

  async function getNotificacoes() {
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const response = await api.get(`/notificacoes/${idNotificacao}`, { headers })
        setListaNotificacao(response.data.results)
      } catch (error: any) {
        console.error('ERRO GET Detalhe Notificação: ', error)
      }
    }
    postVisualiza()
  }

  useEffect(() => {
    getNotificacoes()
  }, [])

  useEffect(() => {
    getNotificacoes()
  }, [isFocused])

  return (
    <MainLayoutAutenticado marginHorizontal={0} marginTop={0}>
      <HeaderPrimary titulo='Detalhes da notificação' voltarScreen={() => navigate('NotificacoesScreen')} />
      <View className='mx-2'>
        {listaNotificacao && listaNotificacao.map((item: PropsNotificacao) => (
          <CardDetalheNotificacao
            key={item.id}
            data={item.data}
            hora={item.hora}
            titulo={item.titulo}
            descricao={item.descricao}
          />
        ))}
      </View>

    </MainLayoutAutenticado>
  );
}
