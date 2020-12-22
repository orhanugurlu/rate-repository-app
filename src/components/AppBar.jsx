import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/react-hooks';

import AppBarTab from './AppBarTab';
import theme from '../theme';
import { AUTHORIZED_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appTab,
    display: 'flex',
    flexDirection: 'row'
  },
});

const AppBar = () => {
  const { data, loading } =
    useQuery(AUTHORIZED_USER, {
      fetchPolicy: 'cache-and-network',
    });
  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/" name="Repositories" />
        {!loading && data && data.authorizedUser &&
          <AppBarTab link="/createReview" name="Create a review" />
        }
        {loading || !data || !data.authorizedUser ?
          <AppBarTab link="/signin" name="Sign In" />
          :
          <AppBarTab name="Sign Out" onPress={() => signOut()} />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;