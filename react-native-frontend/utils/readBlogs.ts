import axios from "axios";

export interface DetailedBlogs {
  id: number;
  title: string;
  image: string;
}
export interface Blogs {
  id: number;
  title: string;
}

export async function readBlogs(): Promise<Blogs[]> {
  try {
    const config = {
      headers: { Authorization: process.env.BEARER_API_TOKEN },
    };
    const response = await axios.get(
      "http://localhost:1337/api/blogs",
      config
    );
    const blogsData = response?.data?.data ?? [];
    return blogsData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function readDetailedBlogs(): Promise<Blogs[]> {
  try {
    const config = {
      headers: { Authorization: process.env.BEARER_API_TOKEN },
    };
    const response = await axios.get(
      "http://localhost:1337/api/blogs",
      config
    );
    const blogsData = response?.data?.data ?? [];
    return blogsData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
