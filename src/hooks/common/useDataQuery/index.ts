import { useApi } from "@/hooks";
import { useCallback } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";

type Arg = {
  url: string;
  query?: any;
  dependencies: any[];
  enabled?: boolean;
  itemList?: any[];
};

export const useDataQuery = (arg: Arg) => {
  const { api } = useApi();
  const fetcher = useCallback(async () => {
    const res = await api.get(arg.url, {
      params: {
        ...arg.query,
      },
    });
    return res?.data || null;
  }, [api, arg.query, arg.url]);

  const fn = useQuery({
    queryKey: [...arg.dependencies],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    retry: 5,
    enabled: arg.enabled,
  });
  return {
    ...fn,
  };
};

export const useDataQueries = (arg: Arg) => {
  const { api } = useApi();
  const fetcher = useCallback(
    async (id: any) => {
      const res = await api.get(`${arg.url}/${id}`, {
        params: {
          ...arg.query,
        },
      });

      return res?.data || null;
    },
    [api, arg.query, arg.url]
  );

  const queries =
    arg.itemList?.map((item) => ({
      queryKey: [...arg.dependencies, item.id],
      queryFn: () => fetcher(item.id),
      refetchOnWindowFocus: false,
      retry: 5,
      enabled: arg.enabled,
    })) || [];

  const fn = useQueries({ queries });

  return { ...fn };
};
