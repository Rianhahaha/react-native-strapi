import { register } from '@/api/auth';
import { Colors } from "@/constants/Colors";
import { Link, Stack, useRouter } from "expo-router";
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';


export default function RegisterScreen() {
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
    <>
          <Stack.Screen options={{ title: "Register" }} />

      <View style={{ padding: 20, gap: 10 }}>
      <TextInput placeholder="Username" onChangeText={setUsername} style={styles.form} />
      <TextInput placeholder="Email" onChangeText={setEmail} style={styles.form} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={styles.form} />
      <Button title="Register" onPress={handleRegister} />
      <Link style={{ color: Colors.dark.text }}  href="/login">have an account?</Link>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  form : {
    padding: 10,
    backgroundColor: 'white'
  }
});

