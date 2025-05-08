import H5 from "../../typography/H5"
import Caption from "../../typography/Caption"
import { colors } from "../../../styles/colors"
import { TouchableOpacity, View } from "react-native"

interface PropsButtonCliente {
  titulo: string,
  usados: number,
  maximo: number,
  onPress: any,
  marginTop: any,
}

export default function ButtonClienteUtilizado({ titulo, usados, maximo, onPress, marginTop }: PropsButtonCliente) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='rounded-lg p-3'
      style={{
        marginTop: marginTop ?? 16,
        backgroundColor: colors.primary90,
        borderColor: colors.primary20,
        borderWidth: 3,
        shadowColor: "#000000",
        marginBottom: 8,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.0,
      }}
    >
      <H5>
        {titulo}
      </H5>
      <View className='bg-[#BB4706] rounded-3xl items-center min-w-[32] max-w-[140] mt-2 px-2 py-1'>
        <Caption fontSize={14} color={colors.white} fontWeight={'500'}>
          {usados}/{maximo} anúncios
        </Caption>
      </View>
    </TouchableOpacity>

  )
}

