import { useState } from "react";

import { login } from "@/api/auth";
import { Colors } from "@/constants/Colors";
import { Link, Stack, useRouter } from "expo-router";
import { Button, StyleSheet, TextInput, View } from "react-native";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      nav.replace("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />
      <View style={{ padding: 20, gap: 10 }}>
        <TextInput placeholder="Email" onChangeText={setEmail} style={styles.form} />
        <TextInput
        style={styles.form}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
        <Link style={{ color: Colors.dark.text }} href="/register">Need an account?</Link>
      </View>
    </>
  );
  
}

const styles = StyleSheet.create({
  form : {
    padding: 10,
    backgroundColor: 'white'
    
  }
});
