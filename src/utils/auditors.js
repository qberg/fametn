import { getDataFromPath } from "./api_calls";

// create a cache of all auditors
var allAuditors = {
  en: [],
  ta: [],
};

var lastUpdated = new Date(0);

export const getAllAuditorsFromStrapi = async (language) => {
    const maxPageSize = 100;
    const path = "auditors?populate=deep&pagination[pageSize]=" + maxPageSize;
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

export const getAllAuditors = async (language) => {
    // if cache is empty, get all auditors and return
    if (allAuditors[language].length === 0) {
        allAuditors[language] = await getAllAuditorsFromStrapi(language);
        lastUpdated = new Date();
        return allAuditors[language];
    }

    // if cache is not empty, check if cache is stale
    const now = new Date();
    const staleTime = 1000 * 60 * 2; // 2 mins
    if (now - lastUpdated > staleTime) {
        allAuditors[language] = await getAllAuditorsFromStrapi(language);
        lastUpdated = now;
        return allAuditors[language];
    }

    // cache is not stale
    return allAuditors[language];
}