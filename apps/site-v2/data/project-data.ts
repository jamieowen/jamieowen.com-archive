import { ProjectContent } from "types";

// Map to
export type SelectedWorkIds =
  | "lbg-systems-thinking"
  | "national-museum-of-qatar"
  | "nexus-thescript"
  | "cnn-airwars"
  | "google-livecase"
  | "argos-giftguide"
  | "google-starbucks"
  | "mcdonalds-40th"
  | "pbs-gamesapp"
  | "serpentine-galleries"
  | "archived-work";

let order = 0;
export const data: { [K in SelectedWorkIds]: ProjectContent } = {
  "lbg-systems-thinking": {
    order: order++,
    baseColor: "green",
    client: "Lloyds Banking Group",
    title: "Systems Thinking",
    agency: "NA",
    tech: ["Typescript", "Python", "WebAssembly"],
    content: ``,
  },
  "national-museum-of-qatar": {
    order: order++,
    baseColor: "green",
    client: "National Museum of Qatar",
    title: "Exhibition Installations",
    agency: "AllOfUs",
    content: ``,
    tech: ["Javascript", "React", "Electron"],
  },
  "nexus-thescript": {
    order: order++,
    baseColor: "lightgray",
    client: "The Script",
    agency: "Nexus Studios",
    title: "The Script Mobile VR",
    content: ``,
    tech: ["Javascript", "WebGL", "three.js"],
  },
  "serpentine-galleries": {
    order: order++,
    baseColor: "lightgray",
    client: "Serpentine Galleries",
    agency: "AllOfUs",
    title: "Mobile Tours",
    content: ``,
    tech: ["Javascript", "pixi.js"],
  },
  "cnn-airwars": {
    order: order++,
    baseColor: "red",
    client: "CNN",
    agency: "CNN",
    title: "Airwar on ISIS",
    content: ``,
    tech: ["Javascript", "React", "three.js"],
  },
  "google-livecase": {
    order: order++,
    baseColor: "lightgray",
    client: "Google",
    agency: "Rehabstudios",
    title: "Google Livecase",
    content: ``,
    tech: ["Javascript", "WebGL", "three.js"],
  },
  "argos-giftguide": {
    order: order++,
    baseColor: "lightgray",
    client: "Argos",
    agency: "Sapient Razorfish",
    title: "Argos Giftguide",
    content: ``,
    tech: ["Javascript", "pixi.js"],
  },
  "pbs-gamesapp": {
    order: order++,
    baseColor: "lightgray",
    client: "PBS Kids",
    title: "PBS Games App",
    agency: "Goodboy Digital",
    content: ``,
    tech: ["Javascript", "WebGL", "pixi.js"],
  },
  "google-starbucks": {
    order: order++,
    baseColor: "lightgray",
    client: "Google",
    title: "Google Fiber",
    agency: "Rehabstudios",
    content: ``,
    tech: ["Javascript", "React", "three.js"],
  },
  "mcdonalds-40th": {
    order: order++,
    baseColor: "lightgray",
    client: "McDonald's",
    title: "40th Anniversary",
    agency: "Goodboy Digital",
    content: ``,
    tech: ["Javascript", "pixi.js", "Natural language"],
  },
  "archived-work": {
    order: order++,
    baseColor: "lightgray",
    client: "Archived",
    title: "Archived",
    agency: null,
    content: ``,
    tech: [],
  },
};
