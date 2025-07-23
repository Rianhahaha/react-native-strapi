import { DetailedArticle, readDetailedArticle } from "@/utils/readArticles";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function ArticleScreen() {
  const [article, setArticle] = useState<DetailedArticle | null>(null);
  const { slug } = useLocalSearchParams();

  useEffect(() => {
    if (typeof slug !== "string") return;

    readDetailedArticle(slug).then((res) => {
      console.log("API result:", res);
      setArticle(res);
    });
  }, [slug]);

  if (!article) return <Text>Loading...</Text>;

  console.log("article:", article);
  return (
    <ScrollView style={{ padding: 16 }}>
      {article?.blocks.map((block) => {
        if (block.__component === "shared.media") {
          return (
            <Image
              key={block.id}
              source={{ uri: `http://localhost:1337${block.file.url}` }}
              style={{ width: "100%", height: 300 }}
            />
          );
        } 
      })}
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
        {article.title}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "medium", color: "white" }}>
        {article.description}
      </Text>

      {article?.blocks.map((block) => {
        switch (block.__component) {
          case "shared.rich-text":
            return (
              <Text
                key={block.id}
                style={{ marginVertical: 8, color: "white" }}
              >
                {block.body}
              </Text>
            );
          case "shared.quote":
            return (
              <View
                key={block.id}
                style={{
                  paddingLeft: 16,
                  borderLeftWidth: 4,
                  marginVertical: 8,
                }}
              >
                <Text style={{ fontStyle: "italic", color: "white" }}>
                  {block.body}
                </Text>
                <Text style={{ color: "white" }}>— {block.title}</Text>
              </View>
            );

          default:
            return null;
        }
      })}
    </ScrollView>
  );
}
