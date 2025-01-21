import { useState } from 'react'
import Caption from '../../typography/Caption'
import { colors } from '../../../styles/colors'
import { Image, Switch, TouchableOpacity, View } from 'react-native'
import { useNavigate } from '../../../hooks/useNavigate'

interface PropsButtonCliente {
  titulo: string,
  image: any,
  onPress: any,
  subtitulo: string,
  disabled: boolean,
  ocultaSwitch?: boolean,
  usados?: string
  total?: string
  props: any
  status?: boolean
}

export default function ButtonClienteSwitch({
  titulo,
  subtitulo,
  image,
  onPress,
  disabled,
  ocultaSwitch,
  total,
  usados,
  props,
  status
}: PropsButtonCliente) {
  const disbledSwitch = true
  const { navigate } = useNavigate()
  const [isEnabled, setIsEnabled] = useState(status)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <TouchableOpacity onPress={disabled ? () => { } : () => navigate('ClienteOfertaDetalheScreen', { props })
    }>
      {
        disabled ?
          <View className=' flex-row items-center justify-between rounded-lg mt-2 p-4' style={{ backgroundColor: '#F0F0F0' }
          } >

            {
              image ?
                <View className='relative'>
                  < View className='absolute w-12 h-12 bg-[#1C1B1F] z-10 rounded-md opacity-60' ></View >
                  <Image source={{ uri: image }} className='rounded-md w-12 h-12' />
                </View >
                :
                <Image source={require('../../../../assets/img/temporarios/produto-utlizados.png')} />
            }
            <View className='flex-1 ml-6'>
              <Caption fontSize={14} color={colors.blackbase}>
                {titulo}
              </Caption>
              <Caption fontSize={14} color={'#ADAAAF'}>
                {subtitulo}
              </Caption>
            </View>
            {
              ocultaSwitch &&
              <View></View>
            }
            {
              !ocultaSwitch &&
              <Switch
                disabled
                className='ml-2'
                value={disbledSwitch}
                ios_backgroundColor='#E7E0EC'
                onValueChange={toggleSwitch}
                trackColor={{ true: '#CAC4D0' }}
                thumbColor={disbledSwitch ? '#1C1B1F' : '#1C1B1F'}
                style={!disbledSwitch && { borderColor: '#CAC4D0', borderWidth: 2 }}
              />
            }
          </View >

          :

          <View className='flex-row items-center justify-start rounded-lg mt-2 p-4' style={{ backgroundColor: '#F0F0F0' }}>
            {image ?
              <Image source={{ uri: image }} className='w-12 h-12 rounded-md' />
              :
              <Image source={require('../../../../assets/img/temporarios/produto-utlizados.png')} />
            }
            <View className='flex-1 ml-6'>
              <Caption fontSize={14} color={colors.primary20}>
                {titulo}
              </Caption>
              <Caption fontSize={14} color={colors.primary20}>
                {subtitulo}
              </Caption>
              <View className='bg-[#BB4706] rounded-3xl items-center min-w-[32] max-w-[140] mt-2 px-2 py-1'>
                <Caption fontSize={14} color={colors.white} fontWeight={'500'}>
                  {usados} / {total} disponível
                </Caption>
              </View>
            </View>
            {ocultaSwitch &&
              <View></View>
            }
            {!ocultaSwitch &&
              <Switch
                onChange={onPress}
                className='ml-2'
                trackColor={{ false: '#CAC4D0', true: '#6750A4' }}
                thumbColor={isEnabled ? '#fff' : '#79747E'}
                style={!isEnabled && { borderColor: '#CAC4D0', borderWidth: 2 }}
                ios_backgroundColor='#E7E0EC'
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            }
          </View>
      }
    </TouchableOpacity >
  )
}

