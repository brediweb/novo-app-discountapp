import React from 'react'
import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
    return (
        <View className='absolute top-1 w-full h-full z-50 flex-1 justify-center items-center bg-black opacity-80 rounded-xl'>
            <ActivityIndicator size={80} color={"#775AFF"} />
        </View>
    )
}
