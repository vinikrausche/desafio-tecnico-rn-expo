export const corporateTheme = {
  brandName: 'Azul-marinho executivo',
  colors: {
    background: '#F3F6F9',
    surface: '#FFFFFF',
    surfaceAlt: '#F8FBFD',
    brand: '#123B63',
    brandStrong: '#0E2F4F',
    brandSoft: '#EAF2F8',
    brandMuted: '#D7E5F1',
    textPrimary: '#14263C',
    textSecondary: '#5E6B79',
    textMuted: '#7F8A97',
    textInverse: '#F8FAFC',
    border: '#D8E1EA',
    borderStrong: '#B8C8D8',
    info: '#175CD3',
    infoBorder: '#B2DDFF',
    infoSoft: '#EFF8FF',
    error: '#B42318',
    errorBorder: '#FECACA',
    errorSoft: '#FEE4E2',
    success: '#027A48',
    successBorder: '#ABEFC6',
    successSoft: '#ECFDF3',
    warning: '#B54708',
    warningBorder: '#FEDF89',
    warningSoft: '#FFFAEB',
  },
} as const;

export const corporateShadows = {
  card: {
    elevation: 3,
    shadowColor: '#0B1F33',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  hero: {
    elevation: 4,
    shadowColor: '#071523',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.18,
    shadowRadius: 28,
  },
} as const;
