import { getDataFromPath } from "./api_calls";

var allResources = {
  en: [],
  ta: [],
};

var lastUpdated = new Date(0);

export const getAllResourcesFromStrapi = async (language) => {
  const maxPageSize = 100;
  const path = "resources?populate=deep&pagination[pageSize]=" + maxPageSize;

  const rawData = await getDataFromPath(path, language);

  // if more pages are there, get them
  const totalPages = rawData?.meta?.pagination?.total;
  const promises = [];

  for (let i = 2; i <= totalPages; i++) {
    const newPath = path + "&pagination[page]=" + i;
    promises.push(getDataFromPath(newPath, language));
  }
  const allData = await Promise.all(promises);
  allData.forEach((each) => {
    rawData.data = rawData.data.concat(each.data);
  });
  return rawData?.data?.map((each) => each.attributes);
};

export const getAllResources = async (language) => {
  // if cache is empty, get all resources and return
  if (allResources[language].length === 0) {
    allResources[language] = await getAllResourcesFromStrapi(language);
    lastUpdated = new Date();
    return allResources[language];
  }

  // if cache is not empty, check if cache is stale
  const now = new Date();
  const staleTime = 1000 * 60 * 2; // 2 mins
  if (now - lastUpdated > staleTime) {
    // cache is stale
    allResources[language] = await getAllResourcesFromStrapi(language);
    lastUpdated = now;
    return allResources[language];
  }

  // cache is not stale
  return allResources[language];
};


export const getAllResourceCategories = async (language) => [
  ...new Set(
    (await getAllResources(language)).flatMap((each) =>
      each.tags.map((every) => every.text)
    )
  ),
];
