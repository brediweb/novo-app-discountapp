import { View } from 'react-native'
import IcoMulher from '../../../../../svg/IcoMulher'
import H2 from '../../../../../components/typography/H2'
import { useNavigate } from '../../../../../hooks/useNavigate'
import FilledButton from '../../../../../components/buttons/FilledButton'
import MainLayoutAutenticadoSemScroll from '../../../../../components/layout/MainLayoutAutenticadoSemScroll'
import H3 from '../../../../../components/typography/H3'
import Caption from '../../../../../components/typography/Caption'
import LottieView from 'lottie-react-native'

export default function ClienteTesteGratisSucessoScreen() {
  const { navigate } = useNavigate()

  return (
    <MainLayoutAutenticadoSemScroll marginTop={0} marginHorizontal={0}>
      <View className='mx-7 mt-5 justify-between flex-1' >
        <View></View>
        <View className='items-center'>
          <View className='mb-4 mt-4'>
            <LottieView style={{ width: 280, height: 280 }} source={require('../../../../../animations/pacote-comprado.json')} autoPlay loop />
          </View>
          <H3 align={'left'}>
            Parabéns, tudo pronto para iniciar o seu teste 🎉
          </H3>
          <View className='mx-4 mt-2'>
            <Caption>
              Agora você pode aproveitar as funcionalidades do Discontapp, impulsionando as suas vendas, através dos nossos cupons.
            </Caption>
          </View>
        </View>
        <FilledButton
          onPress={() => navigate('ClienteTabNavigation', { screen: 'HomeClienteScreen' })}
          title='Continuar' />
      </View>
    </MainLayoutAutenticadoSemScroll>
  );
}