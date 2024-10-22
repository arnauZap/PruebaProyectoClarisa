import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import FONT_FAMILY from '../../../constants/FontFamily'
import { FONT_SIZE } from '../../../constants/styles'
interface Styles {
	buttonDecoration: ViewStyle
	labelStyle: TextStyle
}

const styles = (props:{theme:any,mode: string}): Styles => {
	return StyleSheet.create({
		buttonDecoration: {
			borderRadius: 50,
			backgroundColor:
				props.mode === 'contained' ? props.theme.primary : props.theme.whiteBackground,
			borderColor: props.mode === 'outlined' ? props.theme.primary : 'transparent',
			borderWidth: props.mode === 'outlined' ? 4 : 0
		},
		labelStyle: {
			color: props.mode === 'contained' ? props.theme.whiteText : props.theme.primary,
			fontSize: FONT_SIZE.s,
			fontFamily: FONT_FAMILY.principal_bold,
			paddingTop: 3,
		}
	})
}

export default styles
