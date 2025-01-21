import React, { useState } from 'react'
import { View, Image } from 'react-native'
import { TextInput } from 'react-native-paper'

interface PropsInput {
  mt?: any,
  mask?: string,
  label: string,
  onChange?: any,
  keyboardType: any,
  placeholder?: string,
  secureTextEntry?: boolean,
}

export default function InputOutlinedMaskPhone({ label, onChange, mt, secureTextEntry, placeholder, keyboardType, mask }: PropsInput) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = (value: any) => {
    // Remove todos os caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');

    // Formatar o número conforme a máscara (99)9 9999-9999
    const match = cleanedValue.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);

    if (match) {
      return `(${match[1]})${match[2]}${match[3]}-${match[4]}`;
    }

    return value;
  };

  const handleTextChange = (text: any) => {
    const formattedPhoneNumber = formatPhoneNumber(text);
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <View style={{ marginTop: mt ?? 0 }}>
      <TextInput
        label={label}
        maxLength={14}
        mode='outlined'
        value={phoneNumber}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={{ color: '#49454F' }}
        onChangeText={handleTextChange}
        className='bg-white text-base'
        secureTextEntry={false}
      />

    </View>
  )
}



