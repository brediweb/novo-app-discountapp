import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Image, TouchableOpacity, View } from 'react-native'


export default function BuscaIcon({ label, onChange, mt, secureTextEntry, placeholder, keyboardType, value }: { label?: string, onChange?: any, mt?: any, secureTextEntry?: boolean, placeholder?: string, keyboardType: any, value?: any }) {
  const [visible, setVisible] = useState(false)

  return (
    <View className='' style={{ marginTop: mt ?? 0 }}>
      <TouchableOpacity onPress={() => { }} className='absolute z-50 top-5 left-2'>
        <Image source={require('../../../assets/img/icons/lupa-busca.png')} />
      </TouchableOpacity>
      <TextInput
        label={label}
        mode='outlined'
        onChange={onChange}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        style={{ color: '#49454F' }}
        className='bg-white text-base overflow-scroll pr-7 pl-5'
        secureTextEntry={secureTextEntry && !visible ? true : false}
      />
    </View>
  )
}



