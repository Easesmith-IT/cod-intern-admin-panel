import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchApi = async ({ url, params }, retryCount = 0) => {
  const maxRetries = 3;

  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    const isExtensionError = error.message?.includes(
      "Request interrupted by browser extension"
    );

    // Retry if it's an extension error and we haven't exceeded max retries
    if (isExtensionError && retryCount < maxRetries) {
      console.warn(
        `Extension interference detected, retrying... (${
          retryCount + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (retryCount + 1))
      ); // Exponential backoff
      return fetchApi({ url, params }, retryCount + 1);
    }

    console.error("API Error:", error);
    throw error;
  }
};

export function useApiQuery({
  url,
  queryKeys = [],
  params = {},
  options = {},
}) {
  return useQuery({
    queryKey: [params, ...queryKeys], // Ensures caching based on query params
    queryFn: () => fetchApi({ url, params }),
    ...options, // Allows passing additional options like staleTime, enabled, etc.
  });
}
