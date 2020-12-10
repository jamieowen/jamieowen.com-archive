import { sketch, ParticleSystem } from "@jamieowen/three-toolkit";

sketch(({ render, configure }) => {
  const psystem = new ParticleSystem();

  configure({
    width: "1024px",
    height: "768px",
  });
});
