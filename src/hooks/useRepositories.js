import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection }) => {
  const { data, loading } =
    useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: { orderBy, orderDirection },
    });

  return { data, loading };
};

export default useRepositories;