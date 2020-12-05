import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading } =
    useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
    });

  return { data, loading };
};

export default useRepositories;