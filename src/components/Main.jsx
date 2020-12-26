import React, { useState } from 'react';
import { View } from 'react-native';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-native';
import { useDebounce } from 'use-debounce/lib';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import useRepositories from '../hooks/useRepositories';
import RepositoryDetail from './RepositoryDetail';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const Main = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debounceSearchKeyword] = useDebounce(searchKeyword, 500);
  const { data } = useRepositories({ orderBy, orderDirection, searchKeyword: debounceSearchKeyword });
  const match = useRouteMatch('/repo/:id');

  const setSortCriteria = (criteria) => {
    if (criteria === 'latest') {
      setOrderBy('CREATED_AT');
      setOrderDirection('DESC');
    } else if (criteria === 'highest') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('DESC');
    } else {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('ASC');
    }
  };

  const repo = match && data ?
    data.repositories.edges.map(edge => edge.node).find(repo => repo.id === match.params.id)
    : null;

  return (
    <View>
      <AppBar />
      <Switch>
        <Route path='/' exact>
          <RepositoryList data={data} setSortCriteria={setSortCriteria} setSearchKeyword={setSearchKeyword} />
        </Route>
        <Route path='/signIn' exact>
          <SignIn />
        </Route>
        <Route path="/repo/:id">
          <RepositoryDetail item={repo} />
        </Route>
        <Route path='/createReview' exact>
          <CreateReview />
        </Route>
        <Route path='/signUp' exact>
          <SignUp />
        </Route>
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;