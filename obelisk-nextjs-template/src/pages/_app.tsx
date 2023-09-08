import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { EthosConnectProvider } from 'ethos-connect';
import "../css/font-awesome.css"
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <EthosConnectProvider
          ethosConfiguration={{}}
      >
        <Component {...pageProps} />
      </EthosConnectProvider>

  )
}

export default  MyApp
