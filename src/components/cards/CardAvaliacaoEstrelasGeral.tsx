import React from 'react'
import { View } from 'react-native'
import IcoEstrelas0 from '../../svg/IcoEstrelas0'
import IcoEstrelas1 from '../../svg/IcoEstrelas1'
import IcoEstrelas2 from '../../svg/IcoEstrelas2'
import IcoEstrelas3 from '../../svg/IcoEstrelas3'
import IcoEstrelas4 from '../../svg/IcoEstrelas4'
import IcoEstrelas5 from '../../svg/IcoEstrelas5'

interface PropsCard {
  estrelas: number
}

export default function CardAvaliacaoEstrelasGeral({ estrelas }: PropsCard) {
  return (
    <View>
      {estrelas <= 0 &&
        <IcoEstrelas0 />
      }
      {estrelas > 0 && estrelas <= 1 &&
        <IcoEstrelas1 />
      }
      {estrelas > 1 && estrelas <= 2 &&
        <IcoEstrelas2 />
      }
      {estrelas > 2 && estrelas <= 3 &&
        <IcoEstrelas3 />
      }
      {estrelas > 3 && estrelas <= 4 &&
        <IcoEstrelas4 />
      }
      {estrelas >= 5 &&
        <IcoEstrelas5 />
      }
    </View>
  )
}
