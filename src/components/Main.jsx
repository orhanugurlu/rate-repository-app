import React from 'react';
import { View } from 'react-native';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import useRepositories from '../hooks/useRepositories';
import RepositoryDetail from './RepositoryDetail';
import CreateReview from './CreateReview';

const Main = () => {
  const { data } = useRepositories();
  const match = useRouteMatch('/repo/:id');

  const repo = match && data ?
    data.repositories.edges.map(edge => edge.node).find(repo => repo.id === match.params.id)
    : null;

  return (
    <View>
      <AppBar />
      <Switch>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Route path='/signin' exact>
          <SignIn />
        </Route>
        <Route path="/repo/:id">
          <RepositoryDetail item={repo} />
        </Route>
        <Route path='/createReview' exact>
          <CreateReview />
        </Route>
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;