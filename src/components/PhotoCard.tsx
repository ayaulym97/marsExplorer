import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {scale} from 'react-native-size-matters';

interface Props {
  link: string;
  onPress: () => void;
}

export const PhotoCard = ({link, onPress}: Props) => {
  const updatedLink = link.replace('http', 'https');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage
        style={styles.img}
        source={{
          uri: updatedLink,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 109,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: scale(8),
    margin: scale(8),
  },
  img: {
    flex: 1,
  },
});
