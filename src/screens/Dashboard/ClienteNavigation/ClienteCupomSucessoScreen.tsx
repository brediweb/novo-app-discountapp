import Share from 'react-native-share'
import IcoCopy from '../../../svg/IcoCopy'
import IcoClose from '../../../svg/IcoClose'
import IcoShare from '../../../svg/IcoShare'
import Toast from 'react-native-toast-message'
import { colors } from '../../../styles/colors'
import H3 from '../../../components/typography/H3'
import { View, TouchableOpacity } from 'react-native'
import { useNavigate } from '../../../hooks/useNavigate'
import Clipboard from '@react-native-clipboard/clipboard'
import IcoCupomDesconto from '../../../svg/IcoCupomDesconto'
import MainLayoutAutenticado from '../../../components/layout/MainLayoutAutenticado'

export default function ClienteCupomSucessoScreen(props: any) {
  const { navigate } = useNavigate()
  const idOferta = props.route.params.response.data.results.id

  const shareLinkAndText = async () => {
    try {
      const options = {
        title: 'Compartilhar Link e Texto',
        message: 'Confira esse cupom que achei no app Discontapp:',
        url: `https://www.discontapp.com.br/desconto/${idOferta}`,
      };

      await Share.open(options);
    } catch (error: any) {
      console.log('Erro ao compartilhar:', error.message)
    }
  }

  const copyToClipboard = () => {
    Clipboard.setString(`https://www.discontapp.com.br/desconto/${idOferta}`)
    Toast.show({
      type: 'success',
      text1: 'Código copiado com sucesso!',
    })
  }

  return (
    <MainLayoutAutenticado>
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity onPress={() => navigate('HomeClienteScreen')} className='absolute -top-8 right-2'>
          <IcoClose />
        </TouchableOpacity>
        <View className="mt-4">
          <H3 align={'center'}>Anúncio criado com sucesso!</H3>
        </View>
        <IcoCupomDesconto />
        <View className="w-full px-8">
          <TouchableOpacity className='flex-row justify-center items-center bg-[#2F009C] py-1 rounded-xl' onPress={shareLinkAndText} >
            <IcoShare />
            <H3 align={'center'} color={colors.white}> Compartilhar</H3>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row justify-center items-center bg-[#C9BFFF] py-1 rounded-xl mt-4' onPress={copyToClipboard} >
            <IcoCopy />
            <H3 align={'center'} color={colors.white}> Copiar</H3>
          </TouchableOpacity>
          <TouchableOpacity
            className='flex-row justify-center items-center bg-[#2F009C] py-1 rounded-xl mt-4'
            onPress={() => navigate('Home')}
          >
            <H3 align={'center'} color={colors.white}> Voltar para o início </H3>
          </TouchableOpacity>

        </View>
      </View>
    </MainLayoutAutenticado >
  );
}
