import { SI, GU, DONG } from "../data/search";

export const zoomLevelToRadius = (level) => {
  const obj = {
    11: 3000,
    12: 2000,
    13: 1000,
    14: 500,
    15: 300,
    16: 100,
    17: 50,
    18: 30,
  };

  return obj[level];
};

export const objToQueryString = (obj) => {
  return Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");
};

export const extractSearchQuery = (query) => {
  let si = "";
  let gu = "";
  let dong = "";
  let danji = "";

  if (!query) {
    return { si, gu, dong, danji };
  }

  const splited = query
    .split(" ")
    .filter((v) => !!v)
    .map((v) => ({ isUsed: false, value: v }));

  for (let i = 0; i < splited.length; i++) {
    const word = new RegExp(`${splited[i].value}`, "g");

    for (let j = 0; j < SI.length; j++) {
      if (si || splited[i].isUsed) {
        break;
      }

      if (SI[j].match(word)) {
        si = SI[j];
        splited[i].isUsed = true;
        break;
      }
    }

    for (let j = 0; j < GU.length; j++) {
      if (gu || splited[i].isUsed) {
        break;
      }

      if (GU[j].match(word)) {
        gu = GU[j];
        splited[i].isUsed = true;
        break;
      }
    }

    for (let j = 0; j < DONG.length; j++) {
      if (dong || splited[i].isUsed) {
        break;
      }

      if (DONG[j].match(word)) {
        dong = DONG[j];
        splited[i].isUsed = true;
        break;
      }
    }
  }

  const unusedKeywords = splited.filter((v) => !v.isUsed);

  if (unusedKeywords.length > 0) {
    danji = unusedKeywords[0].value;
  }

  return { si, gu, dong, danji };
};
