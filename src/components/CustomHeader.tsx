import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Assuming you are using Ionicons for icons
import {colors} from 'utils';

interface CustomHeaderProps {
  title: string;
  subTitle?: string;
  titleStyle?: any;
  subTitleStyle?: any;
  leftIcon?: any;
  rightIconName?: string;
  onLeftPress: () => void;
  onRightPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  subTitle,
  titleStyle,
  subTitleStyle,
  leftIcon,
  rightIconName,
  onLeftPress,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
        {leftIcon ? (
          leftIcon
        ) : (
          <Ionicons
            name={'chevron-back-outline'}
            color={colors.black}
            size={scale(24)}
          />
        )}
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Text style={[styles.subTitle, subTitleStyle]}>{subTitle}</Text>
      </View>

      <View style={styles.iconButton}>
        {rightIconName && (
          <TouchableOpacity onPress={onRightPress}>
            <Ionicons name={rightIconName} size={24} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    height: 60,
  },
  title: {
    fontSize: scale(18),
    fontFamily: 'Dosis-SemiBold',
  },
  subTitle: {
    fontSize: scale(13),
    fontFamily: 'Dosis-Regular',
  },
  iconButton: {
    width: scale(30),
    aspectRatio: 1,
  },
  content: {
    alignItems: 'center',
  },
});

export default CustomHeader;
