import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY_URL } from '../graphql/queries';

const useRepositoryUrl = (id) => {
  if (!id) {
    return { data: null, loading: false };
  }
  const { data, loading } =
    useQuery(GET_REPOSITORY_URL, {
      fetchPolicy: 'cache-and-network',
      variables: { id },
    });

  return { data, loading };
};

export default useRepositoryUrl;