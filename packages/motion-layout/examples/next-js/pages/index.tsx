import Head from "next/head";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { Motion, Observe, Debug } from "@jamieowen/motion-layout";

const textLines =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra ligula at neque consectetur tempus. Mauris aliquam ut velit tincidunt euismod. Etiam quis lacus felis. Proin et leo bibendum, laoreet ligula non, commodo metus. Ut vitae pulvinar ipsum. Fusce nec quam nec libero sollicitudin pulvinar nec sit amet augue. Donec vel augue eget magna pellentesque blandit porta nec est. Pellentesque semper mi at ligula vehicula, nec sollicitudin ipsum fringilla. Sed eleifend porta consequat. Sed imperdiet sapien neque, vitae malesuada nibh fringilla at. Cras consectetur, velit eu tincidunt sollicitudin, erat justo ullamcorper libero, eget lacinia elit lacus ut ipsum.";

export default function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {textLines.split(" ").map((t, i) => (
          <Observe>
            {({ ref, domRef }) => {
              return (
                <Debug item={ref.current}>
                  <motion.span ref={domRef} key={i} className={styles.textline}>
                    {t + " "}
                  </motion.span>
                </Debug>
              );
            }}
          </Observe>
        ))}
      </div>
    </div>
  );
}

const Content = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Motion>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
        </Motion>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <Motion>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>
          </Motion>

          <Motion>
            <a href="https://nextjs.org/learn" className={styles.card}>
              <h3>Learn &rarr;</h3>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </Motion>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};
