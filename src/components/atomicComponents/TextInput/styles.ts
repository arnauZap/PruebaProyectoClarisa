import { StyleSheet } from 'react-native'
import FONT_FAMILY from '../../../constants/FontFamily'
import COLORS from '../../../constants/COLORS'
import { MARGIN } from '../../../constants/styles'

const getBackgroundColorInput = (props:Props) => {
  if (props.isDisabled) {
    return props.theme.placeholder
  } else if (props.isOnFocus) {
    return props.theme.inputSelected
  } else {
    return 'transparent'
  }
}
interface Props {
  theme: any
  isOnFocus: any
  isDisabled: any
}

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
    },
    input: {
      backgroundColor: getBackgroundColorInput(props),
      marginTop: MARGIN.s,
    },
    icon: { width: 24, height: 24 },
    passwordIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    helperText: {
      marginTop: -15,
      position: 'absolute',
      top: -20,
      right: 0,
    },
    labelContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    iconStyle: { marginRight: 10 },
    labelInput: {
      fontSize: 14,
      fontFamily: FONT_FAMILY.principal_bold,
    },
  })

export default styles
