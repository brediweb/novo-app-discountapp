import React from 'react'
import { Text } from 'react-native'
import { colors } from '../../styles/colors'

export default function H5({ children, color }: { children: React.ReactNode, color?: string }) {
    return (
        <Text className='text-xl leading-normal font-medium' style={{ color: color ?? colors.blackbase }}>
            {children}
        </Text>
    )
}