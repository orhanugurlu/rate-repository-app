import React from 'react';
import { FlatList } from 'react-native';

import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeperator';
import useUserReviews from '../hooks/useUserReviews';

export const ReviewListContainer = ({ reviews }) => {

  // Get the nodes from the edges array
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <ReviewItem review={item} showUser={false} />
      )}
    />
  );
};

const UserReviews = () => {
  const { data, loading } = useUserReviews({ includeReviews: true });
  return <ReviewListContainer reviews={(!loading && data) ? data.authorizedUser.reviews : null} />;
};

export default UserReviews;