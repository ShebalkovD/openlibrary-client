import { useEffect, useState } from "react";
import { REQUEST_CACHE } from "./cache.ts";

type Params = {
  url: string;
  query?: Record<string, string>;
  queryKey: string;
};

export type Query<TData> = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  data: TData;
};

const HEADERS = new Headers({
  "User-Agent": "o/1.0 (myemail@example.com)",
});

const checkCache = (queryKey: string): boolean => {
  const value = REQUEST_CACHE.get(queryKey);
  return !!value;
};

const getCache = (queryKey: string): unknown => {
  return REQUEST_CACHE.get(queryKey);
};

const writeCache = (queryKey: string, value: unknown): void => {
  REQUEST_CACHE.set(queryKey, value);
};

export const useCreateRequest = <TData>({
  url,
  query,
  queryKey,
}: Params): Query<TData | undefined> => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<TData | undefined>(undefined);

  useEffect(() => {
    const search = new URLSearchParams(query).toString();
    const fullUrl = search ? `${url}?${search}` : url;
    const fullKey = [queryKey, query ? JSON.stringify(query) : ""].join(",");

    const controller = new AbortController();
    const isCached = checkCache(fullKey);
    if (isCached) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
      setIsError(false);
      setIsSuccess(true);
      setErrorMessage("");
      setData(getCache(fullKey) as TData);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    const options = {
      method: "GET",
      headers: HEADERS,
      signal: controller.signal,
    };

    fetch(fullUrl, options)
      .then((res) => {
        if (!res.ok) throw new Error(`Сервер ответил статусом ${res.status}`);
        return res.json();
      })
      .then((data) => {
        writeCache(fullKey, data);
        setData(data);
        setIsSuccess(true);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.message);
      })
      .finally(() => setIsLoading(false));

    // cleanup: отменяем запрос при размонтировании / смене url
    return () => controller.abort();
  }, [query, queryKey, url]);

  return {
    isLoading,
    isError,
    isSuccess,
    data,
    errorMessage,
  };
};
