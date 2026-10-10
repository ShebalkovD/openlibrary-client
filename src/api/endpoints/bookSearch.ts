import { type Query, useCreateRequest } from "../createRequest.ts";
import type { SearchResult } from "../types.ts";

const queryKey = "bookSearch";

export const useBookSearch = (
  query: {
    q: string;
  },
  { enabled }: { enabled?: boolean },
): Query<SearchResult | undefined> => {
  return useCreateRequest({
    url: "https://openlibrary.org/search.json",
    queryKey,
    query,
    enabled,
  });
};
