import "../styles/globals.css";
import { ObserverProvider, SchedulerProvider } from "@jamieowen/motion-layout";

function MyApp({ Component, pageProps }) {
  return (
    <SchedulerProvider>
      <ObserverProvider>
        <Component {...pageProps} />
      </ObserverProvider>
    </SchedulerProvider>
  );
}

export default MyApp;
