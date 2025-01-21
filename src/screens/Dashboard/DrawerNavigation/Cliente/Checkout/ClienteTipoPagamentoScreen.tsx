import { useState } from 'react'
import { View } from 'react-native'
import H5 from '../../../../../components/typography/H5'
import { useNavigate } from '../../../../../hooks/useNavigate'
import FilledButton from '../../../../../components/buttons/FilledButton'
import HeaderPrimary from '../../../../../components/header/HeaderPrimary'
import { useDadosPagamento } from '../../../../../stores/useDadosPagamento'
import RadioButtonFormaPagamento from '../../../../../components/forms/RadioButtonFormaPagamento'
import MainLayoutAutenticadoSemScroll from '../../../../../components/layout/MainLayoutAutenticadoSemScroll'

export default function ClienteTipoPagamentoScreen() {
  const { navigate } = useNavigate()
  const [tipoPagamentos, setTipoPagamento] = useState('')
  const { dadosPagamento, setDadosPagamento } = useDadosPagamento()

  const handleSelectFormaPagamento = (option: string) => {
    setTipoPagamento(option)
  }

  const handleSubmit = () => {
    setDadosPagamento({
      ...dadosPagamento,
    })
    if (tipoPagamentos === 'Pagar com pix') {
      navigate('ClientePagamentoPixScreen')
    } else {
      navigate('ClientePagamentoCartaoScreen')
    }
  }

  return (
    <MainLayoutAutenticadoSemScroll marginTop={0} marginHorizontal={0}>
      <HeaderPrimary voltarScreen={() => navigate('ClientePacotesScreen')} titulo='Realizar Pagamento' />
      <View className='flex-1 justify-between mx-7'>
        <View>
          <H5>Selecione a forma de pagamento</H5>
          <View className='h-6'></View>
          {dadosPagamento.tipo_assinatura === 'Recorrente' ?
            <RadioButtonFormaPagamento
              selectedOption={tipoPagamentos}
              onSelectOption={handleSelectFormaPagamento}
              options={['Pagar com cartão de crédito']}
            />
            :
            <RadioButtonFormaPagamento
              selectedOption={tipoPagamentos}
              onSelectOption={handleSelectFormaPagamento}
              options={['Pagar com pix', 'Pagar com cartão de crédito']}
            />
          }

        </View>
        <View></View>
        <FilledButton
          title='Continuar'
          disabled={tipoPagamentos.length <= 0 ? true : false}
          onPress={handleSubmit}
        />
      </View>
    </MainLayoutAutenticadoSemScroll>
  );
}