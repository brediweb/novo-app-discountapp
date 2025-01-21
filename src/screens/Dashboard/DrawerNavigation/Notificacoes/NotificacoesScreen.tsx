import { useEffect, useState } from 'react'
import { api } from '../../../../service/api'
import H3 from '../../../../components/typography/H3'
import { useIsFocused } from '@react-navigation/native'
import { useNavigate } from '../../../../hooks/useNavigate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CardNotificacao from '../../../../components/cards/CardNotificacao'
import MainLayoutAutenticado from '../../../../components/layout/MainLayoutAutenticado'

interface PropsNotificacao {
  id: string
  hora: string
  data: string
  titulo: string
  descricao: string
  visualizado: boolean
}

export default function NotificacoesScreen() {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const [listaNotificacao, setListaNotificacao] = useState([])

  async function getNotificacoes() {
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
        }
        const response = await api.get(`/notificacoes`, { headers })
        setListaNotificacao(response.data.results)
      } catch (error: any) {
        console.log('ERRO GET Notificações: ', error)
      }
    }
  }

  useEffect(() => {
    getNotificacoes()
  }, [isFocused])
  useEffect(() => {
    if (isFocused) {
      getNotificacoes()
    }
  }, [isFocused])

  return (
    <MainLayoutAutenticado marginHorizontal={0}>
      {listaNotificacao && listaNotificacao.map((item: PropsNotificacao) => (
        <CardNotificacao
          key={item.id}
          titulo={item.data}
          subtitulo={item.hora}
          descricao={item.titulo}
          visualizado={item.visualizado}
          onPress={() => navigate('NotificacoesDetalhesScreen', { id: item.id })}
        />
      ))}

      {listaNotificacao.length === 0 &&
        <H3 align={"center"}>Nenhuma notificação encontrada</H3>
      }

    </MainLayoutAutenticado>
  );
}
