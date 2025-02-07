import React from 'react'
import { colors } from '../../styles/colors'
import { TouchableOpacity, Text } from 'react-native'

interface PropsCategoria {
  titulo: string,
  slug: string,
  ativo: boolean,
  onPress?: any
}

export default function CardCategoria({ titulo, slug, ativo, onPress }: PropsCategoria) {

  return (
    <>
      <TouchableOpacity onPress={onPress}
        className='rounded-lg items-center justify-center px-2 ml-1 mr-2 h-9'
        style={{
          backgroundColor: ativo ? colors.primary90 : '#EEF0FF',
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.40,
          shadowRadius: 2.05,
          elevation: 2,
        }}>
        <Text
          className='text-xs font-medium py-1 px-2'
          style={{ color: colors.neutral10 }}
        >{titulo}</Text>
      </TouchableOpacity>
    </>

  )
}



