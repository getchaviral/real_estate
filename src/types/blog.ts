import type { Meta } from "./common";

export interface BlogAuthor {
  name: string;
  avatar: string;
  bio: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
  isFeatured: boolean;
  meta: Meta;
}

