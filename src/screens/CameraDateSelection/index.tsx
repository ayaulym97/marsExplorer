import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils';
import {Block, CustomInput} from 'components';
import {setPhotos, setValue} from '../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {getPhotos} from '../../api/marsRover';
import moment from 'moment';
import FlashMessage from 'react-native-flash-message';
import {cameraDateSelectionSchema} from '../../../schema';
const {width, height} = Dimensions.get('screen');
const CameraDateSelection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state);
  var {camera, date, loading} = data;
  const [errors, setErrors] = useState({});

  const loadPhotos = async () => {
    dispatch(setValue('loading', true));
    const formattedDate = moment(date).format('YYYY-MM-DD');
    try {
      const response = await getPhotos(camera, formattedDate);
      const photos = response.data.photos;
      dispatch(setPhotos(photos));
      dispatch(setValue('loading', false));
      navigation.navigate('MarsPhotosList');
    } catch (error) {
      dispatch(setValue('loading', false));
    }
  };
  const handleChange = (type: string, value: any) => {
    setErrors({});
    if (type === 'picker') {
      dispatch(setValue('camera', value));
    } else {
      dispatch(setValue('date', value));
    }
  };

  const handleValidation = async () => {
    try {
      await cameraDateSelectionSchema.validate(
        {camera, date},
        {abortEarly: false},
      );
      // Validation successful
      console.log('Validation successful');
      setErrors({});
      loadPhotos;
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach(e => {
        validationErrors[e.path] = e.message;
      });

      setErrors(validationErrors);
    }
  };
  console.log('ERR', errors);
  return (
    <Block backgroundColor={colors.background}>
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <Text style={styles.header}>Select Camera and Date</Text>
        </View>
        <View style={styles.flexBox}>
          <CustomInput
            type="picker"
            label="Rover Camera"
            value={camera}
            errors={errors.camera}
            onChangeText={value => handleChange('picker', value)}
          />
          <CustomInput
            type="datePicker"
            label="Date"
            value={date}
            style={styles.datePicker}
            errors={errors.date}
            onChangeText={value => handleChange('datePicker', value)}
          />
          <TouchableOpacity
            disabled={loading}
            style={[styles.exploreBtn, loading && {opacity: 0.5}]}
            onPress={handleValidation}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.exploreBtnTxt}>Explore</Text>
            )}
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/image/rover.png')}
          style={styles.roverImg}
        />
      </View>
      <FlashMessage
        position={'bottom'}
        duration={1000}

        // style={styles.flashMessageWrapperStyle}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCCEBE',
  },
  headerBox: {flex: 1},
  header: {
    fontSize: 18,
    fontFamily: 'Dosis-SemiBold',
    marginTop: scale(32),
    textAlign: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: 'black',
  },
  datePicker: {
    marginTop: scale(16),
  },
  exploreBtn: {
    width: '95%',
    marginHorizontal: '2.5%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(13),
    borderRadius: scale(8),
    marginTop: scale(32),
  },
  exploreBtnTxt: {
    color: colors.white,
    fontSize: scale(18),
    fontFamily: 'Dosis-SemiBold',
  },
  roverImg: {
    width: width,
    height: height * 0.3,
  },
  flexBox: {
    flex: 1.5,
    justifyContent: 'center',
  },
  flashMessagePosition: {
    bottom: 30,
    left: 50,
    right: 50,
  },
});

export default CameraDateSelection;
