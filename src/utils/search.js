import { SI, GU, DONG } from "../data/search";
import { rationalNumberRegExpWith억 } from "./regExp";

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
  let price = "";

  if (!query) {
    return { si, gu, dong, danji, price };
  }

  const splited = query
    .split(" ")
    .filter((v) => !!v)
    .map((v) => {
      const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      //특수문자 검증
      if (reg.test(v)) {
        //특수문자 제거후 리턴
        return { isUsed: false, value: v.replace(reg, "") };
      } else {
        //특수문자가 없으므로 본래 문자 리턴
        return { isUsed: false, value: v };
      }
    });

  const numberIndex = splited.findIndex((v) =>
    rationalNumberRegExpWith억.test(v.value)
  );

  if (numberIndex > -1) {
    splited[numberIndex].isUsed = true;
    price = splited[numberIndex].value.slice(0, -1);
  }

  for (let i = 0; i < splited.length; i++) {
    const word = new RegExp(`^${splited[i].value}`, "g");

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

  return { si, gu, dong, danji, price };
};
