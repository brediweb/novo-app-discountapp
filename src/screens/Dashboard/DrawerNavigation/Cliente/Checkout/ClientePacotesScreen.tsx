import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { api } from '../../../../../service/api'
import { useIsFocused } from '@react-navigation/native'
import H3 from '../../../../../components/typography/H3'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobal } from '../../../../../context/GlobalContextProvider'
import HeaderPrimary from '../../../../../components/header/HeaderPrimary'
import CardPacote from '../../../../../components/cards/Cliente/CardPacote'
import MainLayoutAutenticado from '../../../../../components/layout/MainLayoutAutenticado'

export default function ClientePacotesScreen() {
  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(true)
  const [listaplanos, setListaPlanos] = useState([])
  const [pacoteGratis, setPacoteGratis] = useState(null)
  const { statusTesteGratis, setStatusTesteGratis } = useGlobal()

  async function getPacotes() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')

    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
          'Content-Type': 'multipart/form-data'
        }
        const response = await api.get(`/pacotes`, { headers })
        setListaPlanos(response.data.results)
      } catch (error: any) {
        console.log('ERROR Lista Pacotes: ', error)
      }
    }
    setLoading(false)
  }

  async function getPacoteGratis() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')
    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)
      const headers = {
        Authorization: `Bearer ${newJson.token}`
      }
      try {
        const response = await api.post(`/verifiaca-teste-gratis`, {}, {
          headers: headers
        })
        setPacoteGratis(response.data.results.pacote_disponivel)
        setStatusTesteGratis(response.data.results.pacote_disponivel)

      } catch (error: any) {
        console.log('ERROR Pacote Gratuito: ', error.response.data.message)
      }
    }
    setLoading(false)
  }


  useEffect(() => {
    getPacotes()
    getPacoteGratis()
  }, [statusTesteGratis])

  useEffect(() => {
    getPacotes()
    getPacoteGratis()
  }, [isFocused])

  return (
    <MainLayoutAutenticado marginTop={0} marginHorizontal={0} loading={loading}>
      <HeaderPrimary titulo='Selecionar pacotes' />
      <View className='mx-7 mt-5 min-h-full'>
        {listaplanos && listaplanos.map((item: any, index: any) => (
          <View key={index}>
            {item.status != 0 &&
              <>{item.id === 4
                ? pacoteGratis ?
                  <CardPacote
                    props={item}
                    valor={item.valor}
                    titulo={item.titulo}
                    beneficios={item.inclusoes_plano}
                    observacao={item.descricao_completa}
                    plano_free_usado={item.utilizou_plano_gratuito}
                  /> : <></>
                : <CardPacote
                  props={item}
                  valor={item.valor}
                  titulo={item.titulo}
                  beneficios={item.inclusoes_plano}
                  observacao={item.descricao_completa}
                  plano_free_usado={item.utilizou_plano_gratuito}
                />
              }
              </>
            }
          </View>
        ))}
        {!loading && listaplanos.length <= 0 &&
          <H3>Nenhum pacote encontrado, em breve teremos novidades !</H3>
        }
      </View>
    </MainLayoutAutenticado>
  );
}
