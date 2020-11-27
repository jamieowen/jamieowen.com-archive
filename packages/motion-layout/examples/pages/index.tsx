import Head from "next/head";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { Observe, Debug, Observable } from "@jamieowen/motion-layout";

const textLines =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra ligula at neque consectetur tempus. Mauris aliquam ut velit tincidunt euismod. Etiam quis lacus felis. Proin et leo bibendum, laoreet ligula non, commodo metus. Ut vitae pulvinar ipsum. Fusce nec quam nec libero sollicitudin pulvinar nec sit amet augue. Donec vel augue eget magna pellentesque blandit porta nec est. Pellentesque semper mi at ligula vehicula, nec sollicitudin ipsum fringilla. Sed eleifend porta consequat. Sed imperdiet sapien neque, vitae malesuada nibh fringilla at. Cras consectetur, velit eu tincidunt sollicitudin, erat justo ullamcorper libero, eget lacinia elit lacus ut ipsum.";

export default function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {textLines
          .split(" ")
          // .slice(0, 30)
          .map((t, i) => (
            <Observable key={i}>
              {(domRef, state) => {
                return (
                  <Debug item={state}>
                    <motion.span
                      ref={domRef}
                      className={styles.textline}
                      animate={{ opacity: state.intersectionRatio }}
                      // transition={{ duration: 0.3 }}
                    >
                      {t + " "}
                    </motion.span>
                  </Debug>
                );
              }}
            </Observable>
          ))}
      </div>
    </div>
  );
}
