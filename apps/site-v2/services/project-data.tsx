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
    agency: null,
  },
  "national-museum-of-qatar": {
    order: order++,
    baseColor: "green",
    client: "National Museum of Qatar",
    title: "Exhibition Installations",
    agency: "AllOfUs",
  },
  "nexus-thescript": {
    order: order++,
    baseColor: "lightgray",
    client: "Nexus",
    agency: "",
    title: "The Script Mobile VR",
  },
  "serpentine-galleries": {
    order: order++,
    baseColor: "lightgray",
    client: "Serpentine Galleries",
    agency: "AllOfUs",
    title: "Mobile Tours",
  },
  "cnn-airwars": {
    order: order++,
    baseColor: "red",
    client: "CNN",
    agency: "CNN",
    title: "Airwar on ISIS",
  },
  "google-livecase": {
    order: order++,
    baseColor: "lightgray",
    client: "Google",
    agency: "Rehabstudios",
    title: "Google Livecase",
  },
  "argos-giftguide": {
    order: order++,
    baseColor: "lightgray",
    client: "Argos",
    agency: "Sapient Razorfish",
    title: "Argos Giftguide",
  },
  "pbs-gamesapp": {
    order: order++,
    baseColor: "lightgray",
    client: "PBS Kids",
    title: "PBS Games App",
    agency: "Goodboy Digital",
  },
  "google-starbucks": {
    order: order++,
    baseColor: "lightgray",
    client: "Google",
    title: "Google Fiber",
    agency: "Rehabstudios",
  },
  "mcdonalds-40th": {
    order: order++,
    baseColor: "lightgray",
    client: "McDonald's",
    title: "40th Anniversary",
    agency: "Goodboy Digital",
  },
  "archived-work": {
    order: order++,
    baseColor: "lightgray",
    client: "Archived",
    title: "Archived",
    agency: null,
  },
};
