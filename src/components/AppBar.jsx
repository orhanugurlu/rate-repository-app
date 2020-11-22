import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appTab,
    display: 'flex',
    flexDirection: 'row'
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/" name="Repositories" />
        <AppBarTab link="/signin" name="Sign In" />
      </ScrollView>
    </View>
  );
};

export default AppBar;