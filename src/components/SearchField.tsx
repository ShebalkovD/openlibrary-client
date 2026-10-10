import { type ChangeEvent, type FC, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { useSearchParams } from "react-router";
import { useDebounce } from "../shared/useDebounce.ts";

export const SearchField: FC = () => {
  const [, setParams] = useSearchParams();
  const [value, setValue] = useState("");
  const debounced = useDebounce(value);
  const isStable = value === debounced;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  useEffect(() => {
    if (!isStable) return;

    if (!debounced) {
      setParams((prev) => {
        prev.delete("search");
        return prev;
      });
    }

    setParams((prev) => {
      prev.set("search", debounced);
      return prev;
    });
  }, [isStable, debounced, setParams]);

  return (
    <TextField
      fullWidth
      value={value ?? ""}
      onChange={handleChange}
      placeholder={"Введите название книги"}
      slotProps={{ input: { endAdornment: <SearchRounded /> } }}
    />
  );
};
