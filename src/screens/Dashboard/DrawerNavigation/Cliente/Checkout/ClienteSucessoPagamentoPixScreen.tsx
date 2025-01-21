import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import H3 from '../../../../../components/typography/H3'
import { useNavigate } from '../../../../../hooks/useNavigate'
import FilledButton from '../../../../../components/buttons/FilledButton'
import MainLayoutSecondary from '../../../../../components/layout/MainLayoutSecondary'

export default function ClienteSucessoPagamentoPixScreen() {
  const { navigate } = useNavigate()

  return (
    <MainLayoutSecondary>
      <View className='mx-7 mt-5 justify-between flex-1' >
        <View></View>
        <View className='items-center'>
          <View className='mb-4  mt-4'>
            <LottieView style={{ width: 280, height: 280 }} source={require('../../../../../animations/pacote-comprado.json')} autoPlay loop />
          </View>
          <View className='my-4 mt-2'>
            <H3 align={'center'}>
              Pagamento realizado com sucesso !
            </H3>
          </View>
        </View>
        <FilledButton
          onPress={() => navigate('ClienteTabNavigation', { screen: 'HomeClienteScreen' })}
          title='Continuar' />
      </View>
    </MainLayoutSecondary>
  );
}