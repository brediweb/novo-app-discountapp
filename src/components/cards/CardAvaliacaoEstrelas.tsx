import React from 'react'
import { View } from 'react-native'
import IcoAvaliacaoQuarto from '../../svg/IcoAvaliacaoQuarto'
import IcoAvaliacaoQuinto from '../../svg/IcoAvaliacaoQuinto'
import IcoAvaliacaoSegundo from '../../svg/IcoAvaliacaoSegundo'
import IcoAvaliacaoPrimeiro from '../../svg/IcoAvaliacaoPrimeiro'
import IcoAvaliacaoTerceiro from '../../svg/IcoAvaliacaoTerceiro'

interface PropsCard {
  estrelas: number
}

export default function CardAvaliacaoEstrelas({ estrelas }: PropsCard) {
  return (
    <View>
      {!estrelas &&
        <IcoAvaliacaoPrimeiro />
      }
      {estrelas <= 1 &&
        <IcoAvaliacaoPrimeiro />
      }
      {estrelas > 1 && estrelas <= 2 &&
        <IcoAvaliacaoSegundo />
      }
      {estrelas > 2 && estrelas <= 3 &&
        <IcoAvaliacaoTerceiro />
      }
      {estrelas > 3 && estrelas <= 4 &&
        <IcoAvaliacaoQuarto />
      }
      {estrelas >= 5 &&
        <IcoAvaliacaoQuinto />
      }
    </View>
  )
}
