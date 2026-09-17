import { useQuery } from "@tanstack/react-query";
import { PrometheiSdk } from "../sdk/promethei";
import { PrometheiDataResponse } from "@promethei-project/promethei-sdk-js";
import { Promises } from "../utils/promises";
import { FilesUtils } from "../components/Files/files.utils";

export function useData() {
  const { data = { content: [] } satisfies PrometheiDataResponse } =
    useQuery<PrometheiDataResponse>({
      queryFn: () =>
        PrometheiSdk.data()
          .cids()
          .then((res) => Promises.rejectOnError(res)),
      queryKey: ["cids"],

      initialData: { content: [] } satisfies PrometheiDataResponse,

      // No need to retry because if the connection to the node
      // is back again, all the queries will be invalidated.
      retry: false,

      // The client node should be local, so display the cache value while
      // making a background request looks good.
      staleTime: 0,

      // Don't expect something new when coming back to the UI
      refetchOnWindowFocus: false,

      // Throw the error to the error boundary
      throwOnError: true,
    });

  return data.content.map((c) => ({
    ...c,
    uploadedAt: FilesUtils.getUploadedAt(c.cid),
  }));
}
