import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {Block, PhotoCard, CustomHeader} from 'components';
import {colors} from 'utils';
import {setValue} from 'store/action';

const MarsPhotosList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state);
  var {camera, date} = data;
  const handleLeftPress = () => {
    navigation.goBack();
  };

  const handlePhoto = (item: any) => {
    const updatedLink = item.img_src.replace('http', 'https');
    dispatch(setValue('selectedId', item.id));
    dispatch(setValue('selectedLink', updatedLink));
    navigation.navigate('MarsPhotoDetails');
  };
  return (
    <Block backgroundColor={colors.background}>
      <CustomHeader
        title={camera}
        subTitle={moment(date).format('DD MMM YYYY')}
        onLeftPress={handleLeftPress}
      />
      <FlatList
        style={styles.list}
        data={data.data}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: data.data.length < 3 ? 'flex-start' : 'center',
        }}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <PhotoCard
            key={item.id}
            link={item.img_src}
            onPress={() => handlePhoto(item)}
          />
        )}
      />
    </Block>
  );
};

export default MarsPhotosList;
const styles = StyleSheet.create({
  list: {marginTop: scale(16), paddingHorizontal: scale(8)},
});
