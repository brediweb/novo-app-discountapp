import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Image, Text, TouchableOpacity, View } from 'react-native'

interface PropsInput {
  label: string,
  onChange?: any,
  mt?: any,
  secureTextEntry?: boolean,
  placeholder?: string,
  keyboardType: any,
  value?: any,
  maxLength?: number
  refInput?: any
  onSubmitEditing?: any
  returnKeyType?: any
  error?: boolean
  uppercase?: any
  onBlur?: any
  onFocus?: any
  edicao?: boolean
  required?: boolean
}

export default function InputOutlined({ required, uppercase, label, onChange, mt, secureTextEntry, placeholder, keyboardType, value, maxLength, refInput, onSubmitEditing, returnKeyType, error, onBlur, onFocus, edicao }: PropsInput) {
  const [visible, setVisible] = useState(false)

  return (
    <View className='' style={{ marginTop: mt ?? 0 }}>
      <TextInput
        label={`${label}${required ? '*' : ''}`}
        error={error}
        onBlur={onBlur}
        onFocus={onFocus}
        editable={edicao ?? true}
        mode='outlined'
        autoCapitalize={uppercase ?? 'none'}
        ref={refInput}
        returnKeyType={returnKeyType ?? 'default'}
        onChange={onChange}
        maxLength={maxLength ?? 9999}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        style={{ color: '#49454F' }}
        className='bg-white text-base overflow-scroll pr-7'
        secureTextEntry={secureTextEntry && !visible ? true : false}
        onSubmitEditing={onSubmitEditing}
      />
      {secureTextEntry && <>
        {visible ?
          <TouchableOpacity onPress={() => setVisible(false)} className='absolute right-4 top-6'>
            <Image source={require('../../../assets/img/icons/eye-not.png')} />
          </TouchableOpacity>

          :
          <TouchableOpacity onPress={() => setVisible(true)} className='absolute right-4 top-6'>
            <Image source={require('../../../assets/img/icons/eye.png')} />
          </TouchableOpacity>
        }
      </>
      }
    </View>
  )
}



