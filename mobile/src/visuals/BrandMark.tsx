import { Image } from 'expo-image';

// The Dhun mark: a lowercase d drawn as a quaver. Bundled, not fetched, so it
// shows on the very first launch with no network. The source is
// brand/dhun-icon-rounded.svg; this PNG is a 128px render of it (brand/README.md).
const MARK = require('../../assets/images/brand-mark.png') as number;

export interface BrandMarkProps {
  /** Width and height in points. */
  size?: number;
}

export function BrandMark({ size = 32 }: BrandMarkProps) {
  return (
    <Image
      source={MARK}
      style={{ width: size, height: size }}
      contentFit="contain"
      accessibilityIgnoresInvertColors
      // Decorative: it always sits beside the name, which is what gets read out.
      accessible={false}
    />
  );
}
