import "../styles/globals.css";
import { Scheduler, SchedulerProvider } from "@jamieowen/motion-layout";

function MyApp({ Component, pageProps }) {
  return (
    // <SchedulerProvider>
    <Scheduler>
      <Component {...pageProps} />
    </Scheduler>
    // </SchedulerProvider>
  );
}

export default MyApp;
