import {Image, ScrollView, Text, View} from 'react-native';
import styles from '../styles/index.scss';
import React from 'react';
import {getHour} from '../utils.ts';

type ForecastScrollProps = {
  temps: string[];
  tempIcons: string[];
};

export function ForecastScroll({temps, tempIcons}: ForecastScrollProps) {
  const renderList = () => {
    return temps.map((item, index) => {
      return (
        <View key={index} style={styles.temps__item}>
          <Image
            style={{
              width: 51,
              height: 51,
              resizeMode: 'contain',
            }}
            source={{uri: 'https:' + tempIcons[index]}}
          />
          <Text style={styles.temps__item__text}>{item}°</Text>
          <Text style={styles.temps__item__hour}>{getHour(index)}</Text>
        </View>
      );
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.temps}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {renderList()}
    </ScrollView>
  );
}
