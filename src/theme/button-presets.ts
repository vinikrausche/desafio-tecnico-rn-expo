// ! Shared button alignment rules for Gluestack controls on Android and iOS.
export const centeredButtonStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 18,
} as const;

export const centeredButtonTextStyle = {
  includeFontPadding: false,
  lineHeight: 18,
  textAlign: 'center',
  textAlignVertical: 'center',
  width: '100%',
} as const;
