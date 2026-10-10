import { Stack, Typography } from "@mui/material";
import { BookList } from "./components/BookList.tsx";
import { SearchField } from "./components/SearchField.tsx";

function App() {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        p: 3,
        backgroundColor: (t) => t.palette.grey.A100,
        alignItems: "center",
      }}
      useFlexGap
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
      >
        Openlibrary поиск
      </Typography>
      <SearchField />
      <BookList />
    </Stack>
  );
}

export default App;
