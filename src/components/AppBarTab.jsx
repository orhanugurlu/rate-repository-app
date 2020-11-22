import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import Text from './Text';

const AppBarTab = ({ name }) => {
  return (
    <TouchableWithoutFeedback>
      <Text color="appTab" fontWeight="bold">{name}</Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;