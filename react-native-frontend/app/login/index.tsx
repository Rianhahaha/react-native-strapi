import { useState } from "react";

import { login } from "@/api/auth";
import { Link, useRouter } from "expo-router";
import { Button, TextInput, View } from "react-native";


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
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Link  href="/register">Need an account?</Link>
    </View>    );
}