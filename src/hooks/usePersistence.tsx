import { useQuery } from "@tanstack/react-query";
import { PrometheiSdk } from "../sdk/promethei";
import { Promises } from "../utils/promises";

const report = false;

export function usePersistence(isPrometheiOnline: boolean) {
  const { data, isError, isFetching, refetch } = useQuery({
    queryKey: [],
    queryFn: async () => {
      return PrometheiSdk.marketplace()
        .activeSlots()
        .then((data) => Promises.rejectOnError(data, report));
    },

    refetchInterval: 5000,

    // Enable only when the use has an internet connection
    enabled: !!isPrometheiOnline,

    // No need to retry because we defined a refetch interval
    retry: false,

    // The client node should be local, so display the cache value while
    // making a background request looks good.
    staleTime: 0,

    // Refreshing when focus returns can be useful if a user comes back
    // to the UI after performing an operation in the terminal.
    refetchOnWindowFocus: true,

    throwOnError: false,
  });

  return { enabled: !isError && !!data, isFetching, refetch };
}
