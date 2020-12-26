import React from 'react';
import { View, StyleSheet } from 'react-native';

import theme from '../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10
  },
  rightContainer: {
    display: 'flex',
    paddingLeft: 10,
    flexShrink: 1
  },
  rightItem: {
    marginTop: 5,
    marginBottom: 5,
  },
  leftContainer: {
    display: 'flex',
    width: 50,
    height: 50,
    borderRadius: 35,
    borderStyle: "solid",
    borderWidth: 3,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary
  },
  rating: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    color: theme.colors.primary
  },
});

const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [day, month, year].join('.');
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text color='main' style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text fontSize='subheading' fontWeight='bold' style={styles.rightItem}>{review.user.username}</Text>
        <Text color='textSecondary' style={styles.rightItem}>{formatDate(review.createdAt)}</Text>
        <Text color='textLabel' style={styles.rightItem}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;