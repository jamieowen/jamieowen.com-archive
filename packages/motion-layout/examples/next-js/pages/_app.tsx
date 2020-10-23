import "../styles/globals.css";
import { ObserverProvider } from "@jamieowen/motion-layout";

function MyApp({ Component, pageProps }) {
  return (
    <ObserverProvider>
      <Component {...pageProps} />
    </ObserverProvider>
  );
}

export default MyApp;
