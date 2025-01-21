import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Image, TouchableOpacity, View } from 'react-native'


export default function InputDisabled({ label, onChange, mt, secureTextEntry, placeholder, keyboardType, value }: { label: string, onChange?: any, mt?: any, secureTextEntry?: boolean, placeholder?: string, keyboardType: any, value?: any }) {
  const [visible, setVisible] = useState(false)

  return (
    <View className='' style={{ marginTop: mt ?? 0 }}>
      <TextInput
        label={label}
        disabled
        mode='outlined'
        onChange={onChange}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        style={{ color: '#ADAAAF' }}
        className='bg-white text-base overflow-scroll pr-7'
        secureTextEntry={secureTextEntry && !visible ? true : false}
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



