/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    inputBackground: '#F5F5F5',  // Background color for input fields in light mode
    buttonBackground: '#0a7ea4',  // Example button color
    borderColor: '#DCDCDC',  // Border color for general elements
    cardBackground: '#FFFFFF',  // Background color for cards in light mode
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    inputBackground: '#2D2D2D',  // Background color for input fields in dark mode
    buttonBackground: '#0a7ea4',  // Example button color
    borderColor: '#333333',  // Border color for general elements
    cardBackground: '#1A1A1A',  // Background color for cards in dark mode
  },
};
