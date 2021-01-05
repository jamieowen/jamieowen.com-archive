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
  | "mcdonalds-40thanniversary"
  | "pbs-gamesapp"
  | "serpentine-galleries";

export const data: { [K in SelectedWorkIds]: ProjectContent } = {
  "lbg-systems-thinking": {
    baseColor: "green",
    client: "Lloyds Banking Group",
    title: "Systems Thinking",
  },
  "nexus-thescript": {
    baseColor: "lightgray",
    client: "Nexus",
    title: "The Script Mobile VR",
  },
  "cnn-airwars": {
    baseColor: "red",
    client: "CNN",
    title: "Airwar on ISIS",
  },
  "google-livecase": {
    baseColor: "lightgray",
    client: "Google",
    title: "Google Livecase",
  },
  "argos-giftguide": {
    baseColor: "lightgray",
    client: "Argos",
    title: "Argos Giftguide",
  },
  "pbs-gamesapp": {
    baseColor: "lightgray",
    client: "PBS Kids",
    title: "PBS Games App",
  },
  "google-starbucks": {
    baseColor: "lightgray",
    client: "Google",
    title: "Google Fiber",
  },
  "mcdonalds-40thanniversary": {
    baseColor: "lightgray",
    client: "McDonald's",
    title: "40th Anniversary",
  },
  "serpentine-galleries": {
    baseColor: "lightgray",
    client: "Serpentine Galleries",
    title: "Mobile Tours",
  },
};
