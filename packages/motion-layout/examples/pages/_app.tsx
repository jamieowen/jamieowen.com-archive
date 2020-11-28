import { Fragment } from "react";
import "../styles/globals.css";
import { Scheduler } from "@jamieowen/motion-layout";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/intersection">Intersection</Link>
        </li>
        <li>
          <Link href="/basic-mount">Basic Mount</Link>
        </li>
      </ul>
      <Scheduler>
        <Component {...pageProps} />
      </Scheduler>
    </Fragment>
  );
}

export default MyApp;
