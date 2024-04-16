import {SET_PHOTOS, SET_VALUE} from './types';
export const setPhotos = (data: any) => {
  return {
    type: SET_PHOTOS,
    payload: data,
  };
};
export const setValue = (name: string, value: any) => {
  return {
    type: SET_VALUE,
    name: name,
    payload: value,
  };
};
