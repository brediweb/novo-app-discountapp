import React, { useState } from 'react';
import { View, Switch, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../styles/colors';

interface PropsFiltro {
  color?: any,
  title: string,
  fontsize?: number,
  image?: any,
}

export default function ButtonSwitch({ title, color, fontsize, image }: PropsFiltro) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <>
      <View
        className='flex-row justify-between items-center rounded-3xl py-4'>
        <Text
          className='text-base font-medium text-start'
          style={{
            color: color ?? colors.blackdark,
            fontSize: fontsize ?? 16
          }}>
          {title}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#6750A4' }}
          thumbColor={isEnabled ? '#fff' : '#79747E'}
          style={!isEnabled && { borderColor: '#79747E', borderWidth: 2 }}
          ios_backgroundColor="#E7E0EC"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </>
  )
}

