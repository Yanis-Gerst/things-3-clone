import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = (
  getter: (entryData: any) => Promise<any>,
  pushUrl: string
) => {
  if (pushUrl[0] !== "/") throw Error("Wrong pushUrl need to start with '/'");
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation(getter, {
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      router.push(pushUrl);
    },
  });

  return mutation.mutate;
};
