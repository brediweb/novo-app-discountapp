import React from 'react'
import { Text } from 'react-native'
import { colors } from '../../styles/colors'

export default function H3({ children, align, color, }: { children: React.ReactNode, align?: any, color?: string }) {
    return (
        <Text
            className='text-2xl font-medium'
            style={{
                color: color ?? colors.dark,
                textAlign: align ?? 'left',
            }}>
            {children}
        </Text>
    )
}