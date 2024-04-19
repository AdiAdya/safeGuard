// components/LoginForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import styles from './LoginFormStyle';

const LoginForm = ({ onLogin }) => {

// managing variables

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
   
    const response = await axios.post(
    'https://safeguard-me-coding-exercise.azurewebsites.net/api/Login',
        { email, password }
    );

    const accessToken = response.data.accessToken;
    onLogin(accessToken); // Will update the acessToken in Login Screen (parent component)
  };

  return (

    <View style={styles.container}>
    <Text style={styles.logoText}>Login</Text>
      <View style={styles.inputView}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      </View>
      <View style={styles.inputView}>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      </View>
      <Button title={'Login'} onPress={handleLogin} />
    </View>
  );
};

export default LoginForm;
