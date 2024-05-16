import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import styles from './src/styles/index.scss';

import {MainComponent} from './src/MainComponent';
import {QueryProvider} from './QueryProvider.tsx';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <QueryProvider>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scroll}>
          <View style={styles.container__view}>
            <MainComponent />
          </View>
        </ScrollView>
      </QueryProvider>
    </SafeAreaView>
  );
}

export default App;
