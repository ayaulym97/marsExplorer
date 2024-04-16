import * as yup from 'yup';
export const cameraDateSelectionSchema = yup.object().shape({
  camera: yup.string().required('Please select an rover camera'),
  date: yup.date().required('Please select a date'),
});
