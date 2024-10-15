import React from 'react'
import { Button as NativeButton, ButtonProps } from 'react-native-paper'
import styles from './styles'
import { ViewStyle } from 'react-native'

export interface IZButtonProps extends Omit<ButtonProps, 'children'> {
	onPress: () => void
	children: JSX.Element | string
	mode?: 'outlined' | 'contained' | 'text'
	style?: ViewStyle
}

const Button: React.FC<IZButtonProps> = ({
	onPress,
	children,
	mode = 'contained',
	style,
	...buttonprops
}) => {
	return (
		<NativeButton
			{...buttonprops}
			mode={mode}
			onPress={onPress}
			style={{ ...styles(mode).buttonDecoration, ...style }}
			labelStyle={styles(mode).labelStyle}
		>
			{children}
		</NativeButton>
	)
}

export default Button
