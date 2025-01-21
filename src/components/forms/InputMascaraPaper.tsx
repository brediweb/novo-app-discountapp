import React from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper'

interface PropsIputaMascara {
  mt?: any,
  value?: any,
  onBlur?: any,
  label: string,
  height?: number,
  keyboardType: any,
  disabled?: boolean
  onChangeText?: any,
  maxLength?: number,
  placeholder?: string,
  refInput?: any
  onSubmitEditing?: any
  returnKeyType?: any
  error?: boolean
  required?: boolean
}

export default function InputMascaraPaper(
  {
    mt,
    label,
    value,
    height,
    onBlur,
    disabled,
    maxLength,
    placeholder,
    onChangeText,
    keyboardType,
    refInput,
    onSubmitEditing,
    returnKeyType,
    error,
    required
  }: PropsIputaMascara) {

  return (
    <View className='w-full' style={{ marginTop: mt ?? 0 }}>
      <TextInput
        ref={refInput}
        label={required ? `${label}*` : label}
        value={value}
        error={error}
        mode='outlined'
        onBlur={onBlur}
        returnKeyType={returnKeyType ?? 'default'}
        onSubmitEditing={onSubmitEditing}
        disabled={disabled}
        secureTextEntry={false}
        outlineColor={'#49454F'}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{ color: '#49454F' }}
        maxLength={maxLength ?? 9999}
        activeOutlineColor={'#6750A4'}
        placeholderTextColor={'#49454F'}
        className='bg-white overflow-scroll'
      />
    </View>
  )
}



