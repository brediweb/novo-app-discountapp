import React from 'react'
import { Defs, G, Path, Rect, Svg } from 'react-native-svg'

export default function IcoMenuFavoritosPlus() {
  return (
    <Svg width="64" height="32" viewBox="0 0 64 32" fill="none">
      <Path d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16C64 24.8366 56.8366 32 48 32H16C7.16344 32 0 24.8366 0 16Z" fill="#E8DEF8" />
      <G clip-path="url(#clip0_30_5981)">
        <Path d="M32 25.35L30.55 24.03C25.4 19.36 22 16.28 22 12.5C22 9.42 24.42 7 27.5 7C29.24 7 30.91 7.81 32 9.09C33.09 7.81 34.76 7 36.5 7C39.58 7 42 9.42 42 12.5C42 16.28 38.6 19.36 33.45 24.04L32 25.35Z" fill="#2F009C" />
      </G>
      <Defs>
        <clipPath id="clip0_30_5981">
          <Rect width="24" height="24" fill="white" transform="translate(20 4)" />
        </clipPath>
      </Defs>
    </Svg>
  )
}
