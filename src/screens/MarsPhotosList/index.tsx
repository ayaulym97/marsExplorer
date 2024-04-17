import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
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
  const camera = useSelector((state: any) => state.camera);
  const date = useSelector((state: any) => state.date);
  const data = useSelector((state: any) => state.data);
  const handleLeftPress = () => {
    navigation.goBack();
  };

  const handlePhoto = (item: any) => {
    const updatedLink = item.img_src.replace('http', 'https');
    dispatch(setValue('selectedId', item.id));
    dispatch(setValue('selectedLink', updatedLink));
    navigation.navigate('MarsPhotoDetails');
  };
  const renderEmptyList = () => (
    <View style={styles.empty}>
      <Text>Photos not found</Text>
    </View>
  );
  return (
    <Block backgroundColor={colors.background}>
      <CustomHeader
        title={camera}
        subTitle={moment(date).format('DD MMM YYYY')}
        onLeftPress={handleLeftPress}
      />
      <FlatList
        style={styles.list}
        data={data}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: data.length < 3 ? 'flex-start' : 'center',
        }}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <PhotoCard
            key={item.id}
            link={item.img_src}
            onPress={() => handlePhoto(item)}
          />
        )}
        ListEmptyComponent={renderEmptyList}
      />
    </Block>
  );
};

export default MarsPhotosList;
const styles = StyleSheet.create({
  list: {marginTop: scale(16), paddingHorizontal: scale(8)},
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
