import { CircularProgress, Stack, Typography } from "@mui/material";
import { useCreateRequest } from "./api/createRequest.ts";

const url = "https://openlibrary.org/search.json";
const queryParams = { q: "harry potter3" };
function App() {
  const { data, isLoading, isSuccess } = useCreateRequest({
    url,
    queryKey: "test",
    query: queryParams,
  });
  return (
    <Stack sx={{ width: "100%", height: "100%", p: 3 }} spacing={2}>
      <Typography variant="h3" sx={{ fontWeight: 700, textAlign: "center" }}>
        Openlibrary поиск
      </Typography>
      {isLoading && <CircularProgress />}
      {isSuccess && <Typography>{JSON.stringify(data, null, 2)}</Typography>}
    </Stack>
  );
}

export default App;
