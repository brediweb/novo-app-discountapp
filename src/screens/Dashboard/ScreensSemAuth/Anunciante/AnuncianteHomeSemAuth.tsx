import { colors } from "../../../../styles/colors"
import { Text, Image, View } from "react-native"
import { useNavigate } from "../../../../hooks/useNavigate"
import Caption from "../../../../components/typography/Caption"
import IcoCupomDescontoPequeno from "../../../../svg/IcoCupomDescontoPequeno"
import MainLayoutAutenticado from "../../../../components/layout/MainLayoutAutenticado"

export default function HomeClienteScreen() {
  const { navigate } = useNavigate()

  return (
    <MainLayoutAutenticado >
      <View className='w-full'>
        <View className="flex-row">
          <Text className="text-[24px] font-semibold text-[#000] mb-3"> Boas-vindas, visitante 🎉</Text>
        </View>

        <View>
          <View className="flex flex-row bg-[#f1eeff] border-2 border-[#775aff] rounded-xl justify-between p-2 py-4 mt-3">
            <View className='w-[70vw]'>
              <Text className='font-semibold text-6xl text-[#2f009c]'>0</Text>
              <Text className='font-semibold text-[#2f009c]'>Quantidade de anúncios vigentes</Text>
            </View>
            <View className='w-[18vw]'>
              <Image source={require('../../../../../assets/img/icons/icoVigentes.png')} />
            </View>
          </View>
          <View className="flex flex-row bg-[#f1eeff] border-2 border-[#775aff] rounded-xl justify-between p-2 py-4 mt-3">
            <View className='w-[70vw]'>
              <Text className='font-semibold text-6xl text-[#2f009c]'>0</Text>
              <Text className='font-semibold text-[#2f009c]'>Total de cupons publicados </Text>
            </View>
            <View className='w-[18vw]'>
              <Image source={require('../../../../../assets/img/icons/icoPublicados.png')} />
            </View>
          </View>
          <View className="flex flex-row bg-[#f1eeff] border-2 border-[#775aff] rounded-xl justify-between p-2 py-4 mt-3">
            <View className='w-[70vw]'>
              <Text className='font-semibold text-6xl text-[#2f009c]'>0</Text>
              <Text className='font-semibold text-[#2f009c]'>Total de cupons consumidos</Text>
            </View>
            <View className='w-[18vw]'>
              <Image source={require('../../../../../assets/img/icons/icoConsumidos.png')} />
            </View>
          </View>
          <View className="flex flex-row bg-[#f1eeff] border-2 border-[#775aff] rounded-xl justify-between p-2 py-4 mt-3">
            <View className='w-[70vw]'>
              <Text className='font-semibold text-6xl text-[#2f009c]'>0</Text>
              <Text className='font-semibold text-[#2f009c]'>Total de cupons favoritos</Text>
            </View>
            <View className='w-[18vw]'>
              <Image source={require('../../../../../assets/img/icons/icoFavoritos.png')} />
            </View>
          </View>

        </View>
      </View>
    </MainLayoutAutenticado >
  )
}
