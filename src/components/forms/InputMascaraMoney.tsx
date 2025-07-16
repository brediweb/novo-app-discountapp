import React from 'react'
import { View } from 'react-native'
import MaskInput from 'react-native-mask-input'

interface PropsIputaMascara {
  mt?: any
  mask?: any
  value?: any
  onBlur?: any
  label: string
  refInput?: any
  height?: number
  error?: boolean
  keyboardType: any
  onChangeText?: any
  disabled?: boolean
  maxLength?: number
  returnKeyType?: any
  placeholder?: string
  onSubmitEditing?: any
}

export default function InputMascaraMoney(
  {
    mt,
    mask,
    value,
    onBlur,
    refInput,
    maxLength,
    error,
    placeholder,
    onChangeText,
    keyboardType,
    returnKeyType,
    onSubmitEditing
  }: PropsIputaMascara) {

  return (
    <View className='w-full' style={{ marginTop: mt ?? 0 }}>
      <MaskInput
        mask={mask}
        value={value}
        ref={refInput}
        onBlur={onBlur}
        secureTextEntry={false}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{
          color: '#49454F',
          borderColor: error ? '#FF0000' : '#49454F'
        }}
        maxLength={maxLength ?? 9999}
        placeholderTextColor={'#49454F'}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType ?? 'default'}
        className='bg-white overflow-scroll border-[1px] rounded-[4px] text-base h-[44px] pl-4'
      />
    </View>
  )
}



