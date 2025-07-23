import { register } from '@/api/auth';
import { Link, useRouter } from "expo-router";
import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';


const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useRouter();

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      console.log('Register berhasil', username, email, password);
      navigation.replace('/login');
    } catch(error: any) {
      console.log('API ERROR:', error.response?.data);
      Alert.alert('Register Gagal', 'Cek apakah email sudah dipakai.');
      
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Register" onPress={handleRegister} />
      <Link  href="/login">have an account?</Link>
    </View>
  );
};

export default RegisterScreen;
