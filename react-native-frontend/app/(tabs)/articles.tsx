import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Article, readArticles } from "@/utils/readArticles";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    readArticles().then(setArticles);
  }, []);
  if (!articles) return <ThemedText>Loading...</ThemedText>;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Articles</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>

        <View style={styles.cardContainer}>
          {Array.isArray(articles) &&
            articles.map((article: any) => (
              <Link
                href={`/articles/${article.slug}`}
                style={styles.card}
                key={article.id}
              >
                <ThemedText type="title">{article.title}</ThemedText>
                <ThemedText>{article.description}</ThemedText>
              </Link>
            ))}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
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
