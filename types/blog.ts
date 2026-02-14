export interface TagFilterItem {
  id: string;
  name: string;
  count: number;
}

export type PostSort = 'latest' | 'oldest';

export interface Post {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags?: TagFilterItem[];
  author?: string;
  date?: string;
  modifiedDate?: string;
  slug: string;
}
