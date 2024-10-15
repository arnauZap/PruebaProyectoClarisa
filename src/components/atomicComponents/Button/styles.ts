import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import Color from '../../constants/Color'
import FONT_FAMILY from '../../../constants/FontFamily'
import { FONT_SIZE } from '../../constants/styles'
interface Styles {
	buttonDecoration: ViewStyle
	labelStyle: TextStyle
}

const styles = (mode: string): Styles => {
	return StyleSheet.create({
		buttonDecoration: {
			borderRadius: 50,
			backgroundColor:
				mode === 'contained' ? Color.primary : Color.whiteBackground,
			borderColor: mode === 'outlined' ? Color.primary : 'transparent',
			borderWidth: mode === 'outlined' ? 4 : 0
		},
		labelStyle: {
			color: mode === 'contained' ? Color.whiteText : Color.primary,
			fontSize: FONT_SIZE.s,
			fontFamily: FONT_FAMILY.principal_bold,
			paddingTop: 3,
		}
	})
}

export default styles
