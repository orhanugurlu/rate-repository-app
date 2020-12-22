import React from 'react';
import { FlatList } from 'react-native';
import useRepositoryUrl from '../hooks/useRepositoryDetail';

import ItemSeparator from './ItemSeperator';
import RepositoryDetailHeader from './RepositoryDetailHeader';
import ReviewItem from './ReviewItem';

const RepositoryDetail = ({ item }) => {
  const { data, loading } = useRepositoryUrl(item.id);
  if (!item || loading || !data) {
    return null;
  }

  return (
    <FlatList
      data={data.repository.reviews.edges.map(edge => edge.node)}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryDetailHeader repo={item} detail={data} />}
    />
  );
};

export default RepositoryDetail;