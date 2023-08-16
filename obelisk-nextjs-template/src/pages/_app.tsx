import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import {WalletProvider} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import "../css/font-awesome.css"
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
  )
}

export default  MyApp
