import { getDataFromPath } from "./api_calls";

// create a cache of all testinglabs
var allTestingLabs = {
  en: [],
  ta: [],
};

var lastUpdated = new Date(0);

export const getAllTestingLabsFromStrapi = async (language) => {
    const maxPageSize = 100;
    const path = "testing-labs?populate=deep&pagination[pageSize]=" + maxPageSize;
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

export const getAllTestingLabs = async (language) => {
    // if cache is empty, get all testinglabs and return
    if (allTestingLabs[language].length === 0) {
        allTestingLabs[language] = await getAllTestingLabsFromStrapi(language);
        lastUpdated = new Date();
        return allTestingLabs[language];
    }
    
    // if cache is not empty, check if cache is stale
    const now = new Date();
    const staleTime = 1000 * 60 * 2; // 2 mins
    if (now - lastUpdated > staleTime) {
        allTestingLabs[language] = await getAllTestingLabsFromStrapi(language);
        lastUpdated = now;
        return allTestingLabs[language];
    }
    
    // cache is not stale
    return allTestingLabs[language];
}