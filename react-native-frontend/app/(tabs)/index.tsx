import { getProfile } from "@/api/auth";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Blogs, readBlogs } from "@/utils/readBlogs";
import { getToken, removeToken } from "@/utils/storage";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";


type Profile = {
  username: string;
  email: string;
};

export default function HomeScreen() {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigation = useRouter();
  useEffect(() => {
    readBlogs().then(setBlogs);
  }, []);

useEffect(() => {
  const checkProfile = async () => {
    const token = await getToken();
    if (!token) {
      return;
    }

    try {
      const user = await getProfile();
      setProfile(user);
    } catch (error) {
      removeToken();
      navigation.replace("/login");
    }
  };

  checkProfile();
}, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
        {profile && (
    <View style={{ padding: 20, gap: 10 }}>
      <Text style={{ color: "white", fontSize: 20 }}>Selamat Datang {profile?.username || '...' }</Text>
      <Button
        title="Logout"
        onPress={() => {
          removeToken();
          navigation.replace('/login');
        }}
      />
    </View>
  

  )}
      <View style={styles.stepContainer}>
        <ThemedText type="title">Blog</ThemedText>
      </View>
            <ThemedView style={styles.titleContainer}>
              {blogs.length === 0 && <ThemedText>No articles found</ThemedText>}
      
              <View style={styles.cardContainer}>
                {Array.isArray(blogs) &&
                  blogs.map((article: any) => (
                    <Link
                      href={`/(tabs)/explore`}
                      style={styles.card}
                      key={article.id}
                    >
                      <ThemedText type="title">{article.Title}</ThemedText>
                      <ThemedText>{article.description}</ThemedText>
                    </Link>
                  ))}
              </View>
            </ThemedView>



    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  cardContainer: {
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  card: {
    flexDirection: "column",
    display: "flex",
    flex: 1,
    gap: 8,
    backgroundColor: "#FFFFFF30",
    width: "100%",
    padding: 20,
    color: "white",
  },
});
