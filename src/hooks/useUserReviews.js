import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries';

const useUserReviews = (variables) => {
  const { data, loading } =
    useQuery(AUTHORIZED_USER, {
      fetchPolicy: 'cache-and-network',
      variables
    });

  return { data, loading };
};

export default useUserReviews;