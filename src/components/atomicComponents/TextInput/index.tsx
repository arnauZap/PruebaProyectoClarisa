import React, { useState } from 'react'
import { TextInput as NativeTextInput, TextInputProps } from 'react-native-paper'
import { View, Image, ViewStyle } from 'react-native'
import componentStyles from './styles'
import IZText from '../Text'
import FONT_FAMILY from '../../../constants/FontFamily'
import { useTheme } from '../../../hooks/useTheme'

export interface IZTextInputProps
	extends Omit<TextInputProps, 'left' | 'right' | 'error'> {
	value: string
	onChangeText?: (text: string) => void
	left?: JSX.Element
	right?: JSX.Element
	error?: string
	style?: ViewStyle
}

const TextInput: React.FC<IZTextInputProps> = (props: IZTextInputProps) => {
	const theme = useTheme()
	const { onChangeText, error, label, value, ...inputProps } = props
	const [isOnFocus, setIsOnFocus] = useState(false)
	const styles = componentStyles({theme, isOnFocus, isDisabled: props.disabled })
	const renderLeftIcon = () => {
		if (props.left) {
			return props.left
		} 
	}

	const renderRightIcon = () => {
		if (props.right) {
			return props.right
		}
	}

	const handleTextChange = (text: string) => {
		onChangeText?.(text)
	}

	const getKeyBoardType = (): TextInputProps['keyboardType'] => {
		return 'visible-password' as const
	}

	return (
		<View style={{ ...styles.container, ...props.style }}>
			<View style={styles.labelContainer}>
				{label ? (
					<IZText bold style={styles.labelInput}>
						{label}
					</IZText>
				) : (
					<View />
				)}
				{error && <IZText type='error'>{error}</IZText>}
			</View>
			<NativeTextInput
				{...inputProps}
				error={!!error}
				onFocus={() => setIsOnFocus(true)}
				onBlur={() => setIsOnFocus(false)}
				value={value}
				onChangeText={handleTextChange}
				keyboardType={getKeyBoardType()}
				style={{ ...styles.input }}
				contentStyle={{
					fontFamily: FONT_FAMILY.principal
				}}
				underlineColor={'transparent'}
				underlineColorAndroid={'transparent'}
				mode='outlined'
				spellCheck={false}
				autoCorrect={false}
				right={<NativeTextInput.Icon icon={() => renderRightIcon()} />}
				left={<NativeTextInput.Icon icon={() => renderLeftIcon()} />}
			/>
		</View>
	)
}

export default TextInput
