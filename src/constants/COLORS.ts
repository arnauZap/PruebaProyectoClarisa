const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

interface Theme {
  text: string
  background: string
  tint: string
  tabIconDefault: string
  tabIconSelected: string
  error: string
}

const COLORS = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    error: '#ff0000',
  } as Theme,
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    error: '#ff0000',
  } as Theme,
}

export default COLORS
