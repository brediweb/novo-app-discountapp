import React from 'react'
import Caption from '../typography/Caption'
import { TouchableOpacity, View, Image } from 'react-native'
import { colors } from '../../styles/colors';

interface RadioButtonProps {
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export default function RadioButtonFormaPagamento({ options, selectedOption, onSelectOption }: RadioButtonProps) {
  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          className='flex-row items-center justify-center rounded px-4 py-4 mb-5'
          style={{
            borderWidth: 2,
            backgroundColor: selectedOption === option ? '#EEF0FF' : '#E9E8E8',
            borderColor: selectedOption === option ? colors.secondary40 : '#E9E8E8'
          }}
          onPress={() => onSelectOption(option)}
        >
          {option == 'Pagar com pix' &&
            <Image className='mr-1' source={require('../../../assets/img/icons/pix.png')} />
          }
          {option == 'Pagar com cartão de crédito' &&
            <Image className='mr-1' source={require('../../../assets/img/icons/cartao.png')} />
          }
          <Caption fontSize={16}> {option} </Caption>
        </TouchableOpacity>
      ))}
    </View>
  )
}



