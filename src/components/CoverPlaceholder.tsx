import type { FC } from "react";
import { Stack } from "@mui/material";
import { ImageRounded } from "@mui/icons-material";
import { COVER_HEIGHT, COVER_WIDTH } from "../shared/constants.ts";

export const CoverPlaceholder: FC = () => {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: COVER_WIDTH,
        height: COVER_HEIGHT,
        backgroundColor: (theme) => theme.palette.action.disabledBackground,
      }}
    >
      <ImageRounded />
    </Stack>
  );
};
