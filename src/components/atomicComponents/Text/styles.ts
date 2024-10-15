import { StyleSheet, TextStyle } from 'react-native'
import FONT_FAMILY from '../../../constants/FontFamily'
import { FONT_SIZE } from '../../../constants/styles'
import COLORS from '../../../constants/COLORS'

const styles = StyleSheet.create({
	commonStyles: { fontFamily: FONT_FAMILY.principal } as TextStyle,
	titleStyles: {
		fontSize: FONT_SIZE.l,
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'left',
		marginBottom: -10
	} as TextStyle,
	subtitleStyles: {
		fontSize: FONT_SIZE.m,
		fontFamily: FONT_FAMILY.principal_bold,
		textAlign: 'left'
	} as TextStyle,
	textStyles: {
		fontSize: FONT_SIZE.s,
		color: '#616161'
	} as TextStyle,
	errorStyles: { fontSize: FONT_SIZE.s, color: COLORS.light.error },
	fontBold: {
		fontFamily: FONT_FAMILY.principal_bold
	} as TextStyle
})

export default styles
