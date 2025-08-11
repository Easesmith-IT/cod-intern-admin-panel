import { DELETE } from "@/constants/apiMethods";
import { axiosInstance } from "@/lib/axiosInstance";
import { readCookie } from "@/lib/readCookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const apiCall = async ({ url, method, data, config = {} }) => {
  try {
    const axiosConfig =
      method === DELETE
        ? { params: data, ...config }
        : { data: data || {}, ...config };

    const response = await axiosInstance({ url, method, ...axiosConfig });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
};

export function useApiMutation({
  url,
  method,
  invalidateKey = null,
  config = {},
  isToast = true,
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => apiCall({ url, method, data, config }),
    onSuccess: (data) => {
      if (isToast) {
        toast.success(data?.message || "Action successful!");
      }

      if (invalidateKey) {
        queryClient.invalidateQueries(invalidateKey);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      const isAuthenticated = readCookie("isAuthenticated");
      queryClient.setQueryData(["isLoggedIn"], isAuthenticated);
    },
  });
}
