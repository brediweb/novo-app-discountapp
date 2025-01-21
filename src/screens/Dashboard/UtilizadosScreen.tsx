import { api } from '../../service/api'
import { colors } from '../../styles/colors'
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigate } from '../../hooks/useNavigate'
import { useIsFocused } from '@react-navigation/native'
import Caption from '../../components/typography/Caption'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CardProdutoUtilizado from '../../components/cards/CardProdutoUtilizado'
import MainLayoutAutenticado from '../../components/layout/MainLayoutAutenticado'
import H3 from '../../components/typography/H3'
import H5 from '../../components/typography/H5'
import { useGlobal } from '../../context/GlobalContextProvider'
import FilledButton from '../../components/buttons/FilledButton'

export default function UtilizadosScreen() {
  const isFocused = useIsFocused()
  const { navigate } = useNavigate()
  const { usuarioLogado } = useGlobal()
  const [tab, setTab] = useState('Atuais')
  const [loading, setLoading] = useState(false)
  const [listaCupons, setListaCupons] = useState([])

  const handleTabChange = (newTab: string) => {
    setTab(newTab)
  }

  async function getCuponsGerados() {
    setLoading(true)
    const jsonValue = await AsyncStorage.getItem('infos-user')

    if (jsonValue) {
      const newJson = JSON.parse(jsonValue)

      try {
        const headers = {
          Authorization: `Bearer ${newJson.token}`,
          'Content-Type': 'multipart/form-data'
        }
        const response = await api.get(`/meus-cupoms`, { headers })
        setListaCupons(response.data.results)
      } catch (error: any) {
        console.log(error)
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    getCuponsGerados()
  }, [])

  useEffect(() => {
    if (isFocused) {
      getCuponsGerados()
    }
  }, [isFocused])

  useEffect(() => {
    getCuponsGerados()
  }, [tab])

  return (
    <>
      <MainLayoutAutenticado loading={loading} notScroll={true}>
        {usuarioLogado &&
          <View>
            <View className='flex-row mb-4'>
              <TouchableOpacity
                onPress={() => handleTabChange('Atuais')}
                className="flex-1 rounded-tl-3xl rounded-bl-3xl items-center py-2"
                style={{
                  backgroundColor: tab === 'Atuais' ? colors.primary40 : colors.gray,
                }}
              >
                <Caption fontWeight={'700'} color={colors.white}>Atuais</Caption>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabChange('Historico')}
                className="flex-1 rounded-tr-3xl rounded-br-3xl items-center py-2"
                style={{
                  backgroundColor: tab === 'Historico' ? colors.primary40 : colors.gray,
                }}
              >
                <Caption fontWeight={'700'} color={colors.white}>Histórico</Caption>
              </TouchableOpacity>
            </View>

            {tab === 'Atuais' && (
              <View>
                {listaCupons &&
                  listaCupons.map((cupom: any) => {
                    if (cupom.utilizado === 'N' && !cupom.cupom_expirado) {
                      return (
                        <CardProdutoUtilizado
                          key={cupom.id}
                          imagem={cupom.imagem_cupom}
                          titulo={cupom.nome_empresa}
                          codigo={cupom.codigo_cupom}
                          data_gerado={cupom.data_criacao}
                          data_utilizado={cupom.data_criacao}
                          gerado=''
                          status={cupom.utilizado}
                          onPress={() => navigate('Detalhes', { cupom })}
                        />
                      );
                    }
                    return null; // Não renderizar nada se cupom.utilizado não for igual a 'N'
                  })}
                {!loading && !listaCupons || listaCupons.length <= 0 &&
                  <H3 align={'center'}>Você não possui cupons ativos</H3>
                }
              </View>
            )}

            {tab === 'Historico' && (
              <View>
                {listaCupons &&
                  listaCupons.map((cupom: any) => {
                    if (cupom.utilizado === 'Y') {
                      return (
                        <CardProdutoUtilizado
                          key={cupom.id}
                          gerado=''
                          status={cupom.utilizado}
                          imagem={cupom.imagem_cupom}
                          titulo={cupom.nome_empresa}
                          codigo={cupom.codigo_cupom}
                          data_gerado={cupom.data_criacao}
                          data_utilizado={cupom.data_criacao}
                          onPress={() => navigate('DetalhesHistorico', cupom)}
                        />
                      );
                    }
                    return null; // Não renderizar nada se cupom.utilizado não for igual a 'N'
                  })}
                {!loading && !listaCupons || listaCupons.length <= 0 &&
                  <H3 align={'center'}>Você não possui cupons utilizados ou vencidos</H3>
                }
              </View>
            )}
          </View>
        }
        {!usuarioLogado &&
          <View className='h-full w-full flex-col justify-between'>
            <View />
            <View>
              <H3 align={'center'} color='#000'>Para acessar essa área você precisa estar logado!</H3>
              <View className='h-1' />
              <Caption align={'center'}>
                Crie uma conta ou faça login em uma conta existente
              </Caption>
            </View>
            <View className='pb-32'>
              <View className='h-2' />
              <FilledButton backgroundColor={colors.secondary50} onPress={() => navigate('FormPessoaFisicaScreen')} title='Criar conta' />
              <View className='h-2' />
              <FilledButton backgroundColor={colors.secondary50} onPress={() => navigate('LoginClienteScreen')} title='Fazer login' />
            </View>
          </View>
        }
      </MainLayoutAutenticado>
    </>
  );
}
