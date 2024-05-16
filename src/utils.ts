import {PermissionsAndroid} from 'react-native';

export const rainCodes = [
  1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1261,
  1264, 1273, 1276,
];

export const getHour = (n: number) => {
  if (n < 12) {
    return n + 1 + ' AM';
  } else {
    return n + 1 + ' PM';
  }
};

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const getBackgroundImage = (
  condition: number,
  isItDay: boolean,
  cloud: number,
) => {
  if (rainCodes.includes(condition)) {
    return require(`../public/rain.jpeg`);
  }

  if (!isItDay) {
    return require(`../public/night-normal.jpeg`);
  } else {
    if (cloud < 25) {
      return require(`../public/sunny-day.jpeg`);
    }
    if (cloud > 25 && cloud < 75) {
      return require(`../public/cloudy-day.jpeg`);
    }
    if (cloud > 75) {
      return require(`../public/really-cloudy.jpeg`);
    }
  }

  return require(`../public/sunny-day.jpeg`);
};

export const getUVstrength = (uv: string) => {
  const uv_num = Number(uv);

  if (uv_num < 3) {
    return 'low';
  }

  if (uv_num > 3 && uv_num < 6) {
    return 'moderate';
  }

  if (uv_num > 6 && uv_num < 8) {
    return 'high';
  }

  if (uv_num > 9 && uv_num < 11) {
    return 'very high';
  }

  if (uv_num > 11) {
    return 'extreme';
  }
};
