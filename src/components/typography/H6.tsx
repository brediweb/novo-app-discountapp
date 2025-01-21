import React from 'react'
import { Text } from 'react-native'
import { colors } from '../../styles/colors'

export default function H6({ children }: { children: React.ReactNode }) {
    return (
        <Text className='text-base font-medium' style={{ color: colors.blackbase }}>
            {children}
        </Text>
    )
}