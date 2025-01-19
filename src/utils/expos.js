import { getDataFromPath } from "./api_calls";

// create a cache of all expos
var allExpos = {
  en: [],
  ta: [],
};

var lastUpdated = new Date(0);

export const getAllExposFromStrapi = async (language) => {
  const maxPageSize = 100;
  const path = "expos-events?populate=deep&pagination[pageSize]=" + maxPageSize;
  const rawData = await getDataFromPath(path, language);

  // if more pages are there, get them
  const totalPages = rawData?.meta?.pagination?.total;
  const promises = [];

  for (let i = 2; i <= totalPages; i++) {
    const newPath = path + "&sort=start_date:desc&pagination[page]=" + i;
    promises.push(getDataFromPath(newPath, language));
  }

  const allData = await Promise.all(promises);
  allData.forEach((each) => {
    rawData.data = rawData.data.concat(each.data);
  });

  return rawData?.data?.map((each) => each.attributes);
};

export const getAllExpos = async (language) => {
  // if cache is empty, get all expos and return
  if (allExpos[language].length === 0) {
    allExpos[language] = await getAllExposFromStrapi(language);
    lastUpdated = new Date();
    return allExpos[language];
  }

  // if cache is not empty, check if cache is stale
  const now = new Date();
  const staleTime = 1000 * 60 * 2; // 2 mins
  if (now - lastUpdated > staleTime) {
    allExpos[language] = await getAllExposFromStrapi(language);
    lastUpdated = now;
    return allExpos[language];
  }

  // cache is not stale
  return allExpos[language];
};

export const getAllExpoCountries = async (language) => [
  ...new Set((await getAllExpos(language)).map((expo) => expo.country)),
];

export const getAllExpoCities = async (language) => [
  ...new Set((await getAllExpos(language)).map((expo) => expo.city)),
];

export const getAllExpoSectors = async (language) => [
  ...new Set((await getAllExpos(language)).map((expo) => expo.sector)),
];
