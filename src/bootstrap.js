import axios from "axios";

export const getBaseUrlByVersionAndPlatform = async (version) => {
  const response = await axios.get(
    `https://boodong.app/api/v2/live/cache/url?platform=ios&version=${version}`
  );

  return response.data;
};
