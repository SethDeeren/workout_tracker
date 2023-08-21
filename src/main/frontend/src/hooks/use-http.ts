import { useState, useCallback } from "react";

type HTTPRequest = {
    url: string;
    method: string | null;
    headers: {} | null;
    body: {} | null;
}

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(async (requestConfig: HTTPRequest, applyData: (data: any)=>void) => {
    setIsLoading(true);
    setError(null);
    const body =
      requestConfig.body === undefined
        ? {}
        : {
            method: requestConfig.method ? requestConfig.method : "GET",
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body
              ? JSON.stringify(requestConfig.body)
              : null,
          };
    try {
      const response = await fetch(requestConfig.url, body);

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;