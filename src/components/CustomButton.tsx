import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from 'react-native-size-matters';

interface Props {
  label?: string;
  icon?: string;
  iconType?: 'AntDesign' | 'Ionicons' | 'EvilIcons' | 'FontAwesome';
  iconColor?: string;
  iconSize?: number;
  onPress?: () => void;
  containerStyle?: StyleProp<TextStyle>;
  txtStyle?: StyleProp<TextStyle>;
}

export const CustomButton: React.FC<Props> = ({
  label,
  icon,
  iconType,
  iconColor,
  iconSize = scale(20),
  onPress,
  containerStyle,
  txtStyle,
}) => {
  let IconComponent: any;
  switch (iconType) {
    case 'AntDesign':
      IconComponent = AntDesign;
      break;
    // case 'Ionicons':
    //   IconComponent = Ionicons;
    //   break;
    // case 'EvilIcons':
    //   IconComponent = EvilIcons;
    //   break;
    // case 'FontAwesome':
    //   IconComponent = FontAwesome;
    //   break;
    // default:
    //   IconComponent = EvilIcons;
  }
  return (
    <TouchableOpacity
      style={[containerStyle, styles.container]}
      onPress={onPress}>
      {label && <Text style={txtStyle}>{label}</Text>}
      {icon && <IconComponent name={icon} color={iconColor} size={iconSize} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
