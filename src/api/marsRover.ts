import apiClient from 'api';

export const getPhotos = async (camera: string, date: any) => {
  const url = `v1/rovers/curiosity/photos?sol=1000&camera=${camera.toLowerCase()}&earth_date=${date}&api_key=ydpaPJ7Xz1DQNVwuvH8zNgkEvdg3jbe1TBmAvz1m`;

  try {
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    return error;
  }
};
