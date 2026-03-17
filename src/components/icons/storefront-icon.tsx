import { createIcon } from '@gluestack-ui/themed';
import { Path } from 'react-native-svg';

// ! Custom storefront icon used where the app needs a store-specific visual cue.
export const StorefrontIcon = createIcon({
  displayName: 'StorefrontIcon',
  path: (
    <>
      <Path
        d="M4 10L5.6 4.8C5.86 3.95 6.64 3.38 7.53 3.38H16.47C17.36 3.38 18.14 3.95 18.4 4.8L20 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Path
        d="M4 10H20V11.5C20 13.43 18.43 15 16.5 15C15.18 15 14.03 14.26 13.44 13.17C13.16 12.66 12.84 12.66 12.56 13.17C11.97 14.26 10.82 15 9.5 15C8.18 15 7.03 14.26 6.44 13.17C6.16 12.66 5.84 12.66 5.56 13.17C4.97 14.26 3.82 15 2.5 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Path
        d="M5 20.5V14.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Path
        d="M19 20.5V14.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Path
        d="M5 20.5H19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Path
        d="M9 20.5V16.5C9 15.95 9.45 15.5 10 15.5H14C14.55 15.5 15 15.95 15 16.5V20.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </>
  ),
  viewBox: '0 0 24 24',
});
