import { vars } from '@zoralabs/zord'

// Override base Zord styles by redefining individual key/val pairs for passing into assignInlineVars() in _document.tsx

export const radiiOverrides = {
  // [vars.radii.small]: vars.space.x3,
  [vars.radii.normal]: vars.space.x4,
  [vars.radii.curved]: vars.space.x4,
  [vars.radii.phat]: vars.space.x6,
  // round is always round
}
