import Caption from '../../typography/Caption'
import { colors } from '../../../styles/colors'
import { TouchableOpacity, View } from 'react-native'

interface PropsButtonCliente {
  onPress?: any,
  titulo: string,
  subtitulo: string,
}

export default function ButtonClienteOfertas({
  titulo,
  subtitulo,
  onPress,
}: PropsButtonCliente) {

  return (
    <TouchableOpacity onPress={onPress} className='bg-[#F0F0F0] flex-row rounded-lg mt-2 p-4'>
      <View className=''>
        <Caption fontSize={16} fontWeight={'bold'} color={colors.primary20}>
          {titulo}
        </Caption>
        <Caption fontSize={14} color={colors.primary20}>
          {subtitulo}
        </Caption>
      </View>
    </TouchableOpacity>
  )
}

