import type { FC } from "react";
import { Box, Chip, CircularProgress, Stack } from "@mui/material";
import { useBookSearch } from "../api/endpoints/bookSearch.ts";
import { BookCard } from "./BookCard.tsx";
import { useSearchParams } from "react-router";

export const BookList: FC = () => {
  const [params] = useSearchParams();
  const search = params.get("search") ?? "";
  const { data, isLoading, isSuccess } = useBookSearch(
    { q: search },
    { enabled: !!search },
  );
  const books = isSuccess && data && search ? data.docs : [];

  if (isLoading) return <CircularProgress />;

  return (
    <Box sx={{ mt: 4 }}>
      {!!search && <Chip label={`Результатов: ${books.length}`}></Chip>}
      <Stack useFlexGap sx={{ gap: 4, mt: 2 }}>
        {books.map((book) => (
          <BookCard data={book} key={book.key} />
        ))}
      </Stack>
    </Box>
  );
};
