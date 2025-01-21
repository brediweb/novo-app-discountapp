import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
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

export default function InputOutlinedMaskCpf({ label, onChange, mt, secureTextEntry, placeholder, keyboardType, mask }: PropsInput) {

  return (
    <View style={{ marginTop: mt ?? 0 }}>
      <TextInput
        label='test'
        mode='outlined'
        accessibilityViewIsModal
        
      />
      <MaskedTextInput
        mask={mask}

        className='mt-4 ml-4'
        onChangeText={onChange}
      />

    </View>
  )
}



