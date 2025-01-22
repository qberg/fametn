import { getDataFromPath } from "./api_calls";

// create a cache of all investment providers
var allInvestmentProviders = {
  en: [],
  ta: [],
};

var lastUpdated = new Date(0);

export const getAllInvestMentProvidersFromStrapi = async (language) => {
  const maxPageSize = 100;
  const path =
    "investment-providers?populate=deep&pagination[pageSize]=" + maxPageSize;
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

export const getAllInvestmentProviders = async (language) => {
  // if cache is empty, get all investment providers and return
  if (allInvestmentProviders[language].length === 0) {
    allInvestmentProviders[language] =
      await getAllInvestMentProvidersFromStrapi(language);
    lastUpdated = new Date();
    return allInvestmentProviders[language];
  }

  // if cache is not empty, check if cache is stale
  const now = new Date();
  const staleTime = 1000 * 60 * 2; // 2 mins
  if (now - lastUpdated > staleTime) {
    allInvestmentProviders[language] =
      await getAllInvestMentProvidersFromStrapi(language);
    lastUpdated = now;
    return allInvestmentProviders[language];
  }

  // cache is not stale
  return allInvestmentProviders[language];
};
