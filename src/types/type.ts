export interface Book {
  _id: string;
  title: string;
  cover: string;
  pages: number;
  published: string | null | undefined; 
  isbn: string;
  status: number;
  author?: string; 
}
