import ErrorBoundary from "@/shared/errorboundary/ErrorBoundary";
import "@/styles/globals.css";
import { client } from "@/utils/connector";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ErrorBoundary>
  );
}
