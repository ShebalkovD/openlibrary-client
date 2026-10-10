import type { FC } from "react";
import type { Book } from "../api/types.ts";
import { Paper, Typography } from "@mui/material";

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
    <Paper sx={{ p: 2 }} elevation={2}>
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
    </Paper>
  );
};
