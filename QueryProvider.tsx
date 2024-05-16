'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

type QueryProviderParams = PropsWithChildren<{}>;
export function QueryProvider({ children }: QueryProviderParams) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
