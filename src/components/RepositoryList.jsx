import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Picker } from '@react-native-community/picker';
import { Searchbar } from 'react-native-paper';

import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeperator';
import theme from '../theme';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'stretch',
  },
  select: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    padding: 10
  },
});

const Search = ({ setSearchKeyword }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setSearchKeyword(query);
  };

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

const SortCriteriaSelect = ({ setSortCriteria }) => {
  const [selected, setSelected] = useState("latest");
  //  Cannot figure out why selected return to default when tab changes.
  //  Therefore, for now make also sorting sync with what we have in select.
  setSortCriteria(selected);
  return (
    <Picker
      prompt='Select an item...'
      selectedValue={selected}
      style={styles.select}
      // eslint-disable-next-line no-unused-vars
      onValueChange={(itemValue, itemIndex) => {
        setSelected(itemValue);
        setSortCriteria(itemValue);
      }}>
      <Picker.Item label="Latest Repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

const RepositoryListHeader = ({ setSortCriteria, setSearchKeyword }) => {
  return (
    <View style={styles.header}>
      <Search setSearchKeyword={setSearchKeyword} />
      <SortCriteriaSelect setSortCriteria={setSortCriteria} />
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, setSortCriteria, setSearchKeyword }) => {
  const history = useHistory();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={RepositoryListHeader({ setSortCriteria, setSearchKeyword })}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => history.push(`/repo/${item.id}`)}>
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
    />
  );
};

const RepositoryList = ({ data, setSortCriteria, setSearchKeyword }) => {
  return <RepositoryListContainer repositories={data ? data.repositories : null} setSortCriteria={setSortCriteria} setSearchKeyword={setSearchKeyword} />;
};

export default RepositoryList;