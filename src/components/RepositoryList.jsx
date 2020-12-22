import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeperator';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => history.push(`/repo/${item.id}`)}>
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
    />
  );
};

const RepositoryList = () => {
  const { data } = useRepositories();

  return <RepositoryListContainer repositories={data ? data.repositories : null} />;
};

export default RepositoryList;