import type { AppProps } from 'next/app';
import "../src/style.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}