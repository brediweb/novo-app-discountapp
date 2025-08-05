import React from 'react'
import Caption from '../typography/Caption'
import { TouchableOpacity, View } from 'react-native'

interface RadioButtonProps {
  options: string[];
  desativar?: boolean;
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export default function RadioButton({ options, selectedOption, onSelectOption, desativar }: RadioButtonProps) {
  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          className='flex-row items-center mb-2'
          onPress={desativar ? () => { } : () => onSelectOption(option)}
        >
          <View
            className='rounded-xl justify-center items-center mr-2 w-6 h-6'
            style={{
              borderWidth: 2,
              borderColor: selectedOption === option ? '#6200E8' : 'gray',
            }}>
            {selectedOption === option && (
              <View className='rounded-full bg-[#6200E8] w-3 h-3' />
            )}
          </View>
          <Caption fontSize={16}> {option} </Caption>
        </TouchableOpacity>
      ))}
    </View>
  )
}



