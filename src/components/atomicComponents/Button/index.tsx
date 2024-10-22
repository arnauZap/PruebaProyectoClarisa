import React from 'react'
import { Button as NativeButton, ButtonProps } from 'react-native-paper'
import componentStyles from './styles'
import { ViewStyle } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'

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
	const theme = useTheme()
	const styles = componentStyles({theme,mode})
	return (
		<NativeButton
			{...buttonprops}
			mode={mode}
			onPress={onPress}
			style={{ ...styles.buttonDecoration, ...style }}
			labelStyle={styles.labelStyle}
		>
			{children}
		</NativeButton>
	)
}

export default Button
