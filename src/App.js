import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import queryString from "query-string";
import Router from "./Router";
import { getBaseUrlByVersionAndPlatform } from "./bootstrap";
import { PublicInstance } from "./apis";
import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const getUrl = async () => {
      const parsed = queryString.parse(window.location.search);
      const { url } = await getBaseUrlByVersionAndPlatform(parsed.version);

      if (url) {
        console.log({ url });
        PublicInstance.defaults.baseURL = url;
      }
    };

    getUrl();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <GlobalStyles />
    </QueryClientProvider>
  );
};

export default App;
