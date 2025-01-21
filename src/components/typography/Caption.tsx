import React from 'react'
import { Text } from 'react-native'
import { colors } from '../../styles/colors'

interface PropsCaption {
    align?: any
    color?: string
    fontSize?: any
    fontWeight?: any
    margintop?: number
    children: React.ReactNode
}

export default function Caption({ children, color, align, fontSize, fontWeight, margintop }: PropsCaption) {
    return (
        <Text
            className='text-xs'
            style={{
                fontSize: fontSize ?? 12,
                marginTop: margintop ?? 0,
                textAlign: align ?? 'left',
                fontWeight: fontWeight ?? '400',
                color: color ?? colors.blackdark,
            }}>
            {children}
        </Text >
    )
}