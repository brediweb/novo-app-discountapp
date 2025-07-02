import { TextInput } from 'react-native-paper'
import React, { useState, useCallback } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

interface PropsInput {
  mt?: number
  label: string
  value?: string
  refInput?: any
  error?: boolean
  height?: number
  edicao?: boolean
  keyboardType: any
  maxLength?: number
  required?: boolean
  onBlur?: () => void
  placeholder?: string
  onFocus?: () => void
  returnKeyType?: string
  secureTextEntry?: boolean
  onSubmitEditing?: () => void
  onChange?: (text: string) => void
  uppercase?: 'none' | 'sentences' | 'words' | 'characters'
}

export default function InputOutlinedCadastro({
  mt,
  value,
  label,
  error,
  onBlur,
  onFocus,
  required,
  height,
  refInput,
  onChange,
  maxLength,
  placeholder,
  keyboardType,
  edicao = true,
  secureTextEntry,
  onSubmitEditing,
  uppercase = 'none',
  returnKeyType = 'default',
}: PropsInput) {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    setVisible((prev) => !prev)
  }, [])

  return (
    <View style={{ marginTop: mt ?? 0 }}>
      <TextInput
        error={error}
        value={value}
        ref={refInput}
        mode="outlined"
        onBlur={onBlur}
        onFocus={onFocus}
        editable={edicao}
        onChangeText={onChange} // Apenas use onChangeText
        placeholder={placeholder}
        autoCapitalize={uppercase}
        keyboardType={keyboardType}
        style={{
          color: '#49454F',
          height: height ?? 52,
        }}
        maxLength={maxLength ?? 9999}
        onSubmitEditing={onSubmitEditing}
        label={`${label}${required ? '*' : ''}`}
        secureTextEntry={secureTextEntry && !visible}
      />
      {/* Botão para alternar visibilidade de senha */}
      {secureTextEntry && (
        <TouchableOpacity
          onPress={toggleVisibility}
          style={{
            position: 'absolute',
            right: 16,
            top: 16,
          }}
        >
          <Image
            source={
              visible
                ? require('../../../assets/img/icons/eye-not.png')
                : require('../../../assets/img/icons/eye.png')
            }
          />
        </TouchableOpacity>
      )}
    </View>
  )
}