import { useColorScheme } from 'react-native';
import THEME from '../constants/COLORS'
import { Theme } from '../interfaces/Theme'

export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? THEME.dark : THEME.light;
}

