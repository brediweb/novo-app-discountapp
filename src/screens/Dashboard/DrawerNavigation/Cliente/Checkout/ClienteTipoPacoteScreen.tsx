import { useState } from 'react'
import { View } from 'react-native'
import H5 from '../../../../../components/typography/H5'
import { useNavigate } from '../../../../../hooks/useNavigate'
import RadioButton from '../../../../../components/forms/RadioButton'
import FilledButton from '../../../../../components/buttons/FilledButton'
import HeaderPrimary from '../../../../../components/header/HeaderPrimary'
import { useDadosPagamento } from '../../../../../stores/useDadosPagamento'
import MainLayoutAutenticadoSemScroll from '../../../../../components/layout/MainLayoutAutenticadoSemScroll'

export default function ClienteTipoPacoteScreen(props: any) {
  const { navigate } = useNavigate()
  const idPacoteAtual = props.route.params.props.id
  const [tipoAssinatura, setTipoAssinatura] = useState('')
  const { dadosPagamento, setDadosPagamento } = useDadosPagamento()

  const handleSelectTipoPagamento = (option: string) => {
    setTipoAssinatura(option)
  }

  const handleSubmit = () => {
    setDadosPagamento(
      {
        ...dadosPagamento,
        id_pacote: idPacoteAtual,
        tipo_assinatura: tipoAssinatura
      })
    navigate('ClienteTipoPagamentoScreen')
  }

  return (
    <MainLayoutAutenticadoSemScroll marginTop={0} marginHorizontal={0}>
      <HeaderPrimary voltarScreen={() => navigate('ClientePacotesScreen')} titulo='Tipo de assinatura' />
      <View className='flex-1 mx-7 justify-between'>
        <View className='mt-4'>
          <H5>Selecione o tipo de assinatura que deseja contratar</H5>
          <View className='h-6'></View>
          <RadioButton
            options={['Avulso', 'Recorrente']}
            selectedOption={tipoAssinatura}
            onSelectOption={handleSelectTipoPagamento}
          />
        </View>
        <View></View>
        <FilledButton
          title='Continuar'
          disabled={tipoAssinatura.length <= 0 ? true : false}
          onPress={handleSubmit}
        />
      </View>
    </MainLayoutAutenticadoSemScroll>
  )
}