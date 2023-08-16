import type { NextPage } from 'next';
import {useRouter} from "next/router";
import Home from "./home";

const IndexPage: NextPage = () => {
  return (
      <main>
          <Home/>
      </main>
  )
}

export default IndexPage


