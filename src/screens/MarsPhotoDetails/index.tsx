import React from 'react';
import FastImage from 'react-native-fast-image';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import Share from 'react-native-share';

import {colors} from 'utils';
import {Block, CustomHeader} from 'components';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';

const {height} = Dimensions.get('screen');
const MarsPhotoDetails = () => {
  const navigation = useNavigation();
  const selectedId = useSelector((state: any) => state.selectedId);
  const selectedLink = useSelector((state: any) => state.selectedLink);

  const goBack = () => {
    navigation.goBack();
  };
  const dwFile = () => {
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', selectedLink)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async base64Data => {
        var base64Data = `data:image/png;base64,` + base64Data;
        // here's base64 encoded image
        await Share.open({url: base64Data});
        // remove the file from storage
        return fs.unlink(imagePath);
      });
  };

  return (
    <Block backgroundColor={colors.black}>
      <CustomHeader
        title={'Photo ID'}
        subTitle={selectedId}
        titleStyle={styles.title}
        subTitleStyle={styles.subTitle}
        onLeftPress={() => goBack()}
        leftIcon={
          <Ionicons
            name={'chevron-back-outline'}
            color={colors.white}
            size={scale(24)}
          />
        }
        rightIconName={'share-outline'}
        onRightPress={dwFile}
      />
      <View style={styles.photo}>
        <FastImage
          style={styles.photoImg}
          source={{
            uri: selectedLink,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
    </Block>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: '90%',
    marginHorizontal: '5%',
    height: height * 0.8,
    marginTop: scale(16),
  },
  photoImg: {
    flex: 1,
    borderRadius: scale(8),
  },
  title: {
    color: colors.white,
    fontSize: scale(13),
    fontFamily: 'Dosis-Regular',
  },
  subTitle: {
    color: colors.white,
    fontSize: scale(18),
    fontFamily: 'Dosis-SemiBold',
  },
});

export default MarsPhotoDetails;
