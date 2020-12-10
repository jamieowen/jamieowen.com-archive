import { Observer, Observable } from "@jamieowen/motion-layout";
import React, { FC, Fragment } from "react";

const Line: FC<any> = ({ children }) => {
  return (
    <Observable>
      {({ ref }) => (
        <h1 ref={ref} className="large-text">
          {children}
        </h1>
      )}
    </Observable>
  );
};

const Word: FC<any> = ({ children }) => {
  return <span className="large-text">{children} </span>;
};

const textLines = [
  "Nulla at viverra ante. Nullam cursus, urna eget pulvinar hendrerit, sem neque laoreet ipsum, ut tincidunt mauris lacus ac diam. ",
  "Sed facilisis arcu ut auctor consectetur. Morbi blandit, ante eget mattis pharetra, magna nisl finibus mi, vel tincidunt dolor massa condimentum ipsum. ",
  "Sed dictum justo nec arcu vehicula, nec vehicula tortor porttitor.",
  "Ut in justo et dolor accumsan pretium condimentum a mi. Vestibulum quam neque, tincidunt ut ultrices a, commodo pellentesque erat.",
  "Nullam a mattis justo, ut volutpat ligula. Vestibulum vitae erat mattis est maximus aliquam id dapibus urna.",
  "Praesent vitae mattis lorem, ac varius urna. Vestibulum at finibus nulla. Nulla scelerisque dictum nunc, at fringilla enim imperdiet quis.",
];

const splitWords = textLines.join(" ").split(" ");

export default function Intersection() {
  return (
    <Observer>
      {textLines.map((t, i) => (
        <Line key={i}>{t}</Line>
      ))}
      {splitWords.map((t, i) => (
        <Word key={i}>{t}</Word>
      ))}
    </Observer>
  );
}
