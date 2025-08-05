import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Image, TouchableOpacity, View } from 'react-native'

interface PropsInputOutlined {
  label?: string,
  onChange?: any,
  mt?: any,
  secureTextEntry?: boolean,
  placeholder?: string,
  keyboardType: any,
  value?: any,
  height?: number,
  maxLength?: any
  textTransform?: any
  uppercase?: any
  error?: boolean
  editable?: boolean
}

export default function InputArea({ label, onChange, mt, secureTextEntry, editable, placeholder, keyboardType, value, height, maxLength, uppercase, error }: PropsInputOutlined) {

  return (
    <View className='' style={{ marginTop: mt ?? 0 }}>
      <TextInput
        label={label}
        value={value}
        error={error}
        mode='outlined'
        multiline={true}
        editable={editable}
        numberOfLines={4}
        onChange={onChange}
        maxLength={maxLength}
        onChangeText={onChange}
        placeholder={placeholder}
        autoCapitalize={uppercase ?? 'none'}
        keyboardType={keyboardType}
        className='bg-white text-base pr-7 placeholder:text-sm '
        style={{ color: '#49454F', height: height ?? 56 }}
      />
    </View>
  )
}



