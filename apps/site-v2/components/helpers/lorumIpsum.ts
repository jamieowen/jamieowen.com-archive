import { LoremIpsum } from "lorem-ipsum";
import { Smush32 } from "@thi.ng/random";

export const lorumIpsum = () => {
  const seed = 123;
  const random = new Smush32(seed);

  const lorem = new LoremIpsum({
    random: () => {
      return random.float();
    },
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  return lorem;
};

export const defaultIpsum = (() => {
  const lipsum = lorumIpsum();
  return () => {
    return lipsum;
  };
})();
