import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    alignItems: 'stretch',
    padding: 10,
  },
  button: {
    padding: 10,
    margin: 5,
    textAlign: 'center',
    borderRadius: 3
  }
});

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text color='tag' fontSize='subheading' fontWeight='bold' style={styles.button}>Sign In</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const signIn = useSignIn();

  const doSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={doSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;