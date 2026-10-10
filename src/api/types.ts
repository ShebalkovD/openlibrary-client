export type Book = {
  key: string; // pk
  title: string;
  series_name: string[];
  author_name: string[];
  first_publish_year: number;
};

export type SearchResult = {
  q: string | null;
  docs: Array<Book>;
};
