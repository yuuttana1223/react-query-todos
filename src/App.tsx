import { TasksPage } from "pages";
import { Layout } from "layouts/Layout";
import { VFC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TagsPage } from "pages/tags";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

export const App: VFC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/tags" element={<TagsPage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
