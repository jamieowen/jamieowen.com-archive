import { complement } from "@jamieowen/three-toolkit";

console.log("INIT");
window.onload = () => {
  console.log("okok");
  document.write("test..");
  const comp = complement([0, 1, 1, 1]);
  console.log(comp);
};

export {};
