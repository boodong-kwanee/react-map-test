import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import queryString from "query-string";
import Router from "./Router";
import { getBaseUrlByVersionAndPlatform } from "./bootstrap";
import { PublicInstance } from "./apis";
import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUrl = async () => {
      try {
        const parsed = queryString.parse(window.location.search);
        const { url } = await getBaseUrlByVersionAndPlatform(parsed.version);

        if (url) {
          console.log({ url });
          PublicInstance.defaults.baseURL = url;
        }

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };

    getUrl();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading ? null : <Router />}
      <GlobalStyles />
    </QueryClientProvider>
  );
};

export default App;
