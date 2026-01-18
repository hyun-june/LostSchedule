import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getCharacter,
  getCharacterProfile,
  getRoster,
} from "../apis/characterApi";

export const useGetRoster = (id: string) => {
  return useQuery({
    queryKey: ["roster", id],
    queryFn: () => {
      return getRoster(id);
    },
    enabled: !!id,
  });
};

export const useGetCharacter = (id: string) => {
  return useQuery({
    queryKey: ["char", id],
    queryFn: () => {
      return getCharacter(id);
    },
    enabled: !!id,
  });
};

export const useGetCharacterProfile = (roster: string[]) => {
  const queries = useQueries({
    queries: (roster ?? []).map((id) => ({
      queryKey: ["CharProfile", id],
      queryFn: () => getCharacterProfile(id),
      enabled: !!id,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
    })),
  });

  const data = queries.map((q) => q.data);

  const isInitialLoading =
    data.every((d) => !d) && queries.some((q) => q.isLoading);

  const isFetching = queries.some((q) => q.isFetching);
  const isError = queries.some((q) => q.isError);

  return { data, isInitialLoading, isFetching, isError };
};
