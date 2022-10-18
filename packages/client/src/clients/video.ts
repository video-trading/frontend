export interface Video {
  id: string;
  title: string;
  description: string;
  cover: string;
  video: string;
  created_at: any;
  updated_at: any;
  likes: number;
  owner: any;
  tags: string[];
  price: number;
}

export interface Comment {
  author: any;
  content: string;
  created_at: any;
  id: string;
  video: any;
}

export interface Transaction {
  amount: number;
  created_at: any;
  id: string;
  from: any;
  to: any;
  video: any;
  status: string;
}
