// hooks/useLoadFonts.ts
import { useFonts } from 'expo-font';
import { fonts } from '../constants/fonts'; // Import the fonts

const useLoadFonts = () => {
  const [fontsLoaded] = useFonts(fonts);

  // Return whether fonts are loaded, or false if not
  return fontsLoaded;
};

export default useLoadFonts;
