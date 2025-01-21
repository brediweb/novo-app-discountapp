import React from 'react';
import { colors } from '../../styles/colors';
import { TouchableOpacity, Text, Image } from 'react-native';

interface PropsPerfil {
  color?: any;
  image?: any;
  title: string;
  mt?: number;
  fontsize?: number;
  onPress: () => void;
}

export default function ButtonPerfil({
  title,
  onPress,
  color,
  fontsize,
  image,
  mt = 0,
}: PropsPerfil) {
  return (
    <>
      <TouchableOpacity
        style={{ marginTop: mt }}
        className="flex-row justify-between items-center rounded-3xl"
        onPress={onPress}
      >
        <Text
          className="text-base font-medium text-start"
          style={{
            color: color ?? colors.blackdark,
            fontSize: fontsize ?? 16,
          }}
        >
          {title}
        </Text>
        <Image
          source={image ?? require('../../../assets/img/icons/arrow-r.png')}
        />
      </TouchableOpacity>
    </>
  );
}
