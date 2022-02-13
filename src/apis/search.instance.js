import { PublicInstance } from ".";

export const getSearchList = async (queryString) => {
  const response = await PublicInstance({
    url: "/search/list?" + queryString,
    method: "GET",
  });

  return response.data;
};

export const getSearchMap = async (queryString) => {
  const response = await PublicInstance({
    url: "/search/map?" + queryString,
    method: "GET",
  });

  return response.data;
};
