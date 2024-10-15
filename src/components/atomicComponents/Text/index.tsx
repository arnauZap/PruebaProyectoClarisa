import React from 'react'
import { Text as NativeText, TextProps } from 'react-native-paper'
import styles from './styles'
import { TextStyle } from 'react-native'

type Type = 'title' | 'subtitle' | 'text' | 'error'

interface Props extends Omit<TextProps<never>, 'style'> {
	bold?: boolean
	style?: TextStyle
	type?: Type
}

const Text = (props: Props) => {
	
	const getStyleByType = (type?: Type, bold?: boolean): TextStyle => {
		const commonStyles = styles.commonStyles as TextStyle
		let style = { ...styles.commonStyles }
		if (type === 'title') {
			style = { ...commonStyles, ...styles.titleStyles }
		} else if (type === 'subtitle') {
			style = { ...commonStyles, ...styles.subtitleStyles }
		} else if (type === 'text') {
			style = { ...commonStyles, ...styles.textStyles }
		} else if (type === 'error') {
			style = { ...commonStyles, ...styles.errorStyles }
		} else {
			style = {...commonStyles, ...styles.textStyles }
		}
		return { ...style, ...(bold ? styles.fontBold : {}) }
	}

	return (
		<NativeText
			{...props}
			style={{
				...getStyleByType(props.type, props.bold),
				...(props.style as TextStyle)
			}}
		/>
	)
}

export default Text
