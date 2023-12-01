export interface PostMutation {
  title: string;
  description: string;
}

export interface Post {
  date: string;
  id: string;
  title: string;
  description: string;
}

export interface PostsList {
  [id: string]: Post;
}