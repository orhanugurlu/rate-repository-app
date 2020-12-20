import React from 'react';
import { Image, View, StyleSheet, TouchableWithoutFeedback, Linking } from 'react-native';
import useRepositoryUrl from '../hooks/useRepositoryUrl';

import theme from '../theme';
import Stat from './Stat';
import Tag from './Tag';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.item
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  topRightContainer: {
    display: 'flex',
    paddingLeft: 10,
    flexShrink: 1
  },
  statsContainer: {
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  topRightItem: {
    marginTop: 5,
    marginBottom: 5,
  },
  statItem: {
    flexGrow: 1
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  button: theme.button
});

const RepositoryItem = ({ item, showOpenButton = false }) => {
  const { data, loading } = useRepositoryUrl(item ? item.id : null);
  if (!item) {
    return null;
  }

  const onPressLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={styles.topRightContainer}>
          <Text testID='fullName' fontSize='subheading' fontWeight='bold' style={styles.topRightItem}>{item.fullName}</Text>
          <Text testID='description' color='textSecondary' style={styles.topRightItem}>{item.description}</Text>
          <Tag text={item.language} style={styles.topRightItem} />
        </View>
      </View>
      <View style={styles.statsContainer}>
        <Stat name='Stars' value={item.stargazersCount} style={styles.statItem} />
        <Stat name='Forks' value={item.forksCount} style={styles.statItem} />
        <Stat name='Reviews' value={item.reviewCount} style={styles.statItem} />
        <Stat name='Rating' value={item.ratingAverage} round={false} style={styles.statItem} />
      </View>
      {showOpenButton && !loading && data &&
        <View>
          <TouchableWithoutFeedback onPress={() => onPressLink(data.repository.url)}>
            <Text color='tag' fontSize='subheading' fontWeight='bold' style={styles.button}>Open in GitHub</Text>
          </TouchableWithoutFeedback>
        </View>}
    </View>
  );
};

export default RepositoryItem;