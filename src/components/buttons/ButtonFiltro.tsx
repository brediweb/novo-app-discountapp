import React from 'react'
import { colors } from '../../styles/colors'
import IcoSetaDireita from '../../svg/IcoSetaDireita'
import { TouchableOpacity, Text, Image } from 'react-native'

interface PropsFiltro {
  color?: any,
  title: string,
  onPress: () => void,
  fontsize?: number,
  image?: any,
  isActive?: any
  icon_color?: any
}

export default function ButtonFiltro({ title, onPress, color, fontsize, image, isActive, icon_color }: PropsFiltro) {
  return (
    <>
      {isActive === 1 &&
        <TouchableOpacity
          className='flex-row justify-between items-center rounded-3xl py-4'
          onPress={onPress}>
          <Text
            className='text-base font-medium text-start mr-4'
            style={{
              color: color ?? colors.blackdark,
              fontSize: fontsize ?? 16
            }}>
            {title}
          </Text>
          <IcoSetaDireita color={icon_color ? icon_color : colors.blackbase} />
        </TouchableOpacity>
      }

    </>
  )
}

