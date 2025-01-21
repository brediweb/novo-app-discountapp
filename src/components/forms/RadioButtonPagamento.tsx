import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../styles/colors';
import H5 from '../typography/H5';

interface PropsRadioButton {
  tituloPrimeiro?: any,
  tituloSegundo?: any,
  onchange?: any
}

export default function RadioButtonPagamento({ tituloPrimeiro, tituloSegundo, onchange }: PropsRadioButton) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleOptionSelect('pix')}
        className='flex-row items-center justify-center rounded px-4 py-4'
        style={{
          backgroundColor: selectedOption === 'pix' ? '#EEF0FF' : '#E9E8E8'
        }}
      >
        <Image className='mr-1' source={require('../../../assets/img/icons/pix.png')} />
        <H5>{tituloPrimeiro}</H5>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleOptionSelect('cartao')}
        className='flex-row items-center justify-center rounded px-4 py-4 mt-3'
        style={{
          backgroundColor: selectedOption === 'cartao' ? '#EEF0FF' : '#E9E8E8'
        }}
      >
        <Image className='mr-1' source={require('../../../assets/img/icons/cartao.png')} />
        <H5>{tituloSegundo}</H5>
      </TouchableOpacity>
    </View>
  )
}



