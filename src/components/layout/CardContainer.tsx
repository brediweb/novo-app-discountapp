import React from 'react'
import { View } from 'react-native'
import { colors } from '../../styles/colors'

export default function CardContainer({ children }: {
    children: React.ReactNode
}) {
    return (
        <View
            style={{
                backgroundColor: colors.ice,
                borderRadius: 10,
                padding: 20,
                marginTop: 8
            }}
        >{children}</View>
    )
}
