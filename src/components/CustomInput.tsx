import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {roverCameras} from 'utils/const';
import {colors} from 'utils';
import CalendarIcon from 'assets/icons/calendar';

interface Props {
  type: 'picker' | 'datePicker';
  label: string;
  value: any;
  style?: any;
  errors?: any;
  onChangeText: (value: any) => void;
}

const CustomInput: React.FC<Props> = ({
  type,
  label,
  value,
  style,
  errors,
  onChangeText,
}) => {
  const [open, setOpen] = useState(false);
  const setInput = () => {
    switch (type) {
      case 'picker':
        return (
          <>
            <RNPickerSelect
              value={value}
              onValueChange={(value: string) => onChangeText(value)}
              style={pickerSelectStyles}
              placeholder={{
                label: 'Select rover camera',
                value: null,
                color: 'lightgray',
              }}
              items={roverCameras}
              useNativeAndroidPickerStyle={false}
              Icon={() => (
                <Ionicons
                  name="chevron-down"
                  color="gray"
                  style={styles.inputIcon}
                  size={24}
                />
              )}
            />
            {errors && errors.selectedDate && (
              <Text style={styles.errorText}>{errors.camera}</Text>
            )}
          </>
        );
      case 'datePicker':
        const selectedDate = moment(value).format('DD MMM YYYY');
        return (
          <View>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setOpen(true)}>
              <Text style={styles.dateTxt}>
                {value ? selectedDate : 'Select Date'}
              </Text>
              <CalendarIcon />
            </TouchableOpacity>

            <DatePicker
              modal
              open={open}
              date={value}
              onConfirm={(date: Date) => {
                setOpen(false);
                onChangeText(date);
              }}
              onCancel={() => setOpen(false)}
            />
          </View>
        );
      default:
        return null;
    }
  };
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      {setInput()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: '5%',
  },
  label: {
    color: colors.black,
    fontSize: scale(14),
    fontFamily: 'Dosis-Regular',
  },
  picker: {
    height: 60,
    backgroundColor: colors.white,
    borderRadius: scale(9),
    marginTop: scale(7),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    flexDirection: 'row',
  },
  dateTxt: {
    fontSize: scale(18),
    color: colors.black,
    fontFamily: 'Dosis-Regular',
  },
  calendarLogo: {
    width: scale(24),
    aspectRatio: 1,
  },
  inputIcon: {
    top: 25,
    right: 16,
    position: 'relative',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    fontSize: scale(18),
    color: colors.black,
    fontFamily: 'Dosis-Regular',
    backgroundColor: colors.white,
    borderRadius: scale(9),
    marginTop: scale(7),
    paddingHorizontal: scale(16),
    paddingRight: 30,
  },
  inputAndroid: {
    height: 60,
    fontSize: scale(18),
    color: colors.black,
    fontFamily: 'Dosis-Regular',
    backgroundColor: colors.white,
    borderRadius: scale(9),
    marginTop: scale(7),
    paddingHorizontal: scale(16),
  },
});

export default CustomInput;
