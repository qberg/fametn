import { getDataFromPath } from "./api_calls";

// create a cache of all promoters
var allPromoters = {
  en: [],
  ta: [],
};

var lastUpdated = new Date(0);

export const getAllPromotersFromStrapi = async (language) => {
    const maxPageSize = 100;
    const path = "export-promoters?populate=deep&pagination[pageSize]=" + maxPageSize;
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
}

export const getAllPromoters = async (language) => {
    // if cache is empty, get all promoters and return
    if (allPromoters[language].length === 0) {
        allPromoters[language] = await getAllPromotersFromStrapi(language);
        lastUpdated = new Date();
        return allPromoters[language];
    }
    
    // if cache is not empty, check if cache is stale
    const now = new Date();
    const staleTime = 1000 * 60 * 2; // 2 mins
    if (now - lastUpdated > staleTime) {
        allPromoters[language] = await getAllPromotersFromStrapi(language);
        lastUpdated = now;
        return allPromoters[language];
    }
    
    // cache is not stale
    return allPromoters[language];
}

