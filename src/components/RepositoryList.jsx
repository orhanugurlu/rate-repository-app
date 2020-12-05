import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.main
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = !loading && data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RepositoryItem item={item} />
      )}
    />
  );
};

export default RepositoryList;