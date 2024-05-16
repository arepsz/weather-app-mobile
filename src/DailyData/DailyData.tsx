import {Text, View} from 'react-native';
import styles from '../styles/index.scss';
import {getUVstrength} from '../utils.ts';

type DailyDataProps = {
  humidity: string;
  wind: string;
  uv: string;
  pressure: string;
};

export function DailyData({humidity, wind, uv, pressure}: DailyDataProps) {
  return (
    <View style={styles.content__daily}>
      <View style={styles.content__daily__row}>
        <View style={styles.content__daily__row__element}>
          <Text style={styles.content__daily__row__element__title}>
            UV index
          </Text>
          <View>
            <Text style={styles.content__daily__row__element__text}>{uv}</Text>
            <Text style={styles.content__daily__row__element__text_bottom}>
              {getUVstrength(uv)}
            </Text>
          </View>
        </View>
        <View style={styles.content__daily__row__element}>
          <Text style={styles.content__daily__row__element__title}>
            Humidity
          </Text>
          <View>
            <Text style={styles.content__daily__row__element__text}>
              {humidity}
            </Text>
            <Text style={styles.content__daily__row__element__text_bottom}>
              %
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.content__daily__row}>
        <View style={styles.content__daily__row__element}>
          <Text style={styles.content__daily__row__element__title}>Wind</Text>
          <View>
            <Text style={styles.content__daily__row__element__text}>
              {wind}
            </Text>
            <Text style={styles.content__daily__row__element__text_bottom}>
              km/h
            </Text>
          </View>
        </View>
        <View style={styles.content__daily__row__element}>
          <Text style={styles.content__daily__row__element__title}>
            Pressure
          </Text>
          <View>
            <Text style={styles.content__daily__row__element__text}>
              {pressure}
            </Text>
            <Text style={styles.content__daily__row__element__text_bottom}>
              mBar
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
