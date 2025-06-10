export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = []; 