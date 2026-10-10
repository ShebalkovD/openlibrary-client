import type { FC } from "react";
import type { Book } from "../api/types.ts";
import { Box, Paper, Typography } from "@mui/material";
import { COVER_HEIGHT, COVER_WIDTH } from "../shared/constants.ts";
import { CoverPlaceholder } from "./CoverPlaceholder.tsx";

type Props = {
  data: Book;
};

type RowProps = {
  label: string;
  value: string | number | null | undefined;
};

const Row: FC<RowProps> = ({ label, value }) => {
  return (
    <Typography>
      <Typography
        component={"span"}
        sx={{
          color: (theme) => theme.palette.text.secondary,
          display: "inline-block",
          minWidth: 60,
        }}
      >{`${label}: `}</Typography>
      <Typography component={"span"}>{value}</Typography>
    </Typography>
  );
};

export const BookCard: FC<Props> = ({ data }) => {
  return (
    <Paper
      sx={{ p: 2, display: "flex", justifyContent: "start", gap: 2 }}
      elevation={2}
    >
      {!!data.cover_i && (
        <img
          width={COVER_WIDTH}
          height={COVER_HEIGHT}
          src={`https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`}
          alt={""}
        />
      )}

      {!data.cover_i && <CoverPlaceholder />}

      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {data.title}
        </Typography>
        <Row label={"Год"} value={data.first_publish_year} />
        <Row
          label={"Автор"}
          value={data.author_name ? data.author_name.join(", ") : "-"}
        />
        <Row
          label={"Серия"}
          value={data.series_name ? data.series_name.join(", ") : "-"}
        />
      </Box>
    </Paper>
  );
};
