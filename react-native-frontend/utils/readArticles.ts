import axios from "axios";

type Block = {
  id: number;
  __component: string;
  body?: string;
  title?: string;
  file: {
    url: string;
  }
};

export interface DetailedArticle {
  id: number;
  title: string;
  description: string;
  blocks: Block[];
}
export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
}

export async function readArticles(): Promise<Article[]> {
  try {
    const config = {
      headers: { Authorization: process.env.BEARER_API_TOKEN },
    };
    const response = await axios.get(
      "http://localhost:1337/api/articles",
      config
    );
    const articlesData = response?.data?.data ?? [];
    console.log(articlesData);
    return articlesData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function readDetailedArticle(
  slug: string
): Promise<DetailedArticle | null> {
  try {
    const config = {
      headers: { Authorization: process.env.BEARER_API_TOKEN },
      params: {
        populate: 
        {
          blocks: {
            populate: "*",
          },
        },
        filters: {
          slug: { $eq: slug }, // ✅ Required by Strapi
        },
      },
    };
    const response = await axios.get(
      "http://localhost:1337/api/articles",
      config
    );
    const DetailedArticleData = response?.data?.data?.[0];
    console.log("Read Article debug : ", DetailedArticleData);
    return DetailedArticleData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
