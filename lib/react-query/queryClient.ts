import { isServer, QueryClient } from '@tanstack/react-query';

const queryDefaults = {
  staleTime: 60 * 1000,
  refetchOnWindowFocus: false,
  retry: 1,
} as const;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: queryDefaults,
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
