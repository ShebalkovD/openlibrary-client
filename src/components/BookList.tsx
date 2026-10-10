import type { FC } from "react";
import { Box, Chip, CircularProgress, Stack } from "@mui/material";
import { useBookSearch } from "../api/endpoints/bookSearch.ts";
import { BookCard } from "./BookCard.tsx";

export const BookList: FC = () => {
  const { data, isLoading, isSuccess } = useBookSearch({ q: "harry potter" });
  const books = data ? data.docs : [];

  if (isLoading || !isSuccess) return <CircularProgress />;
  return (
    <Box sx={{ mt: 4 }}>
      <Chip label={`Результатов: ${books.length}`}></Chip>
      <Stack useFlexGap sx={{ width: 800, gap: 4, mt: 2 }}>
        {books.map((book) => (
          <BookCard data={book} />
        ))}
      </Stack>
    </Box>
  );
};
