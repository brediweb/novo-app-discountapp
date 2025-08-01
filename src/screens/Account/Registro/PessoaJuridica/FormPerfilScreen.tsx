import { View } from 'react-native'
import React, { useState } from 'react'
import RadioSimples from './RadioSimples'
import { useNavigate } from '../../../../hooks/useNavigate'
import FilledButton from '../../../../components/buttons/FilledButton'
import HeaderPrimary from '../../../../components/header/HeaderPrimary'
import MainLayoutAutenticadoSemScroll from '../../../../components/layout/MainLayoutAutenticadoSemScroll'

export default function FormPerfilScreen({ route }: { route: any }) {
  const infoForm = route.params
  const { navigate } = useNavigate()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]) as any
  const categoriaIdString = JSON.stringify(selectedOptions)

  const handleSelectOption = (options: string[]) => {
    setSelectedOptions(options)
  }

  return (
    <MainLayoutAutenticadoSemScroll marginTop={0} marginHorizontal={0} loadign={loading}>
      <HeaderPrimary titulo='Escolha seu perfil (até 3)' />
      <View className='mx-4 flex-1'>
        <RadioSimples selectedOptions={selectedOptions} onSelectOption={handleSelectOption} />
      </View>
      <View className='mx-4 mt-6'>
        <FilledButton
          title='Próximo'
          disabled={selectedOptions?.length <= 0 ? true : false}
          onPress={() => navigate('FormDefinirHorarioScreen', {
            dataform: infoForm,
            categorias: categoriaIdString,
          })}
        />
      </View>
    </MainLayoutAutenticadoSemScroll>
  );
}