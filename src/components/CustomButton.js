import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Fonts } from '../constants';
import { Colorscheme } from '../constants/Colors';

export default function CustomButton({
  title,
  onPress,
  bgColor = Colorscheme.BLUE,
  textColor = Colorscheme.MAINTHEME,
  fontSize = 14,
  disabled = false,
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? Colorscheme.LIGHTBLUE : bgColor },
        style,
      ]}
    >
      <Text
        allowFontScaling={false}
        style={[
          styles.text,
          { color: textColor, fontSize: fontSize },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  text: {
    fontFamily: Fonts.medium,
  },
});
