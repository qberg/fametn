import { getDataFromPath } from "./api_calls";

var allEvents = {
  en: [],
  ta: [],
};

var lastUpdated = new Date(0);

const getFilteredEvents = (allEvents, searchWords) => {
  if (!searchWords || typeof searchWords !== "string") {
    return allEvents;
  }

  // Split searchWords into individual words, remove extra spaces, and convert to lowercase
  const words = searchWords
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return allEvents;
  }

  // Define weights for different fields
  const weights = {
    title: 5,
    location: 1,
    category: 3,
  };

  const countOccurrences = (text, word) => {
    if (!text) return 0;
    const regex = new RegExp(`\\b${word}\\b`, "gi"); // Match whole words, case-insensitive
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  };

  const scoredEvents = allEvents.map((event) => {
    let score = 0;

    words.forEach((word) => {
      // Count matches in each field and multiply by weight
      score +=
        countOccurrences(event.title, word) * weights.title ||
        countOccurrences(event.location, word) * weights.location ||
        countOccurrences(event.category, word) * weights.category;
      // Add more fields if necessary
    });

    return { ...event, relevanceScore: score };
  });

  const filteredAndRankedEvents = scoredEvents
    .filter((event) => event.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  return filteredAndRankedEvents;
};

export const getUpComingNEvents = async (language) => {
  const today = new Date().toISOString().split("T")[0];
  const path =
    "events?populate=deep&filters[start_date][$gt]=" +
    today +
    "&sort=start_date:desc";

  const rawData = await getDataFromPath(path, language);
  return rawData?.data?.map((each) => each.attributes);
};

export const parseMetaAndData = (upcomingEvents) => {
  const meta = {
    supertitle_2: upcomingEvents.supertitle_2,
    title_2: upcomingEvents.title_2,
    description_2: upcomingEvents.description_2,
  };

  const data = upcomingEvents.events.data.map((each) => each.attributes);
  return {
    metaEvents: meta,
    upcomingEvents: data,
  };
};

export const getAllEventsFromStrapi = async (language) => {
  const maxPageSize = 1;
  const path = "events?populate=deep&pagination[pageSize]=" + maxPageSize;

  const rawData = await getDataFromPath(path, language);

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

export const getAllEvents = async (language) => {
  // if cache is empty, get all events and return
  if (allEvents[language].length === 0) {
    console.log("Cache is empty");
    allEvents[language] = await getAllEventsFromStrapi(language);
    lastUpdated = new Date();
    return allEvents[language];
  }

  // if cache is not empty, check if cache is stale
  const now = new Date();
  const staleTime = 1000 * 60 * 2; // 2 mins
  if (now - lastUpdated > staleTime) {
    // cache is stale
    console.log("Cache is stale");
    allEvents[language] = await getAllEventsFromStrapi(language);
    lastUpdated = now;
    return allEvents[language];
  }

  // cache is not stale
  console.log("Cache is not stale");
  return allEvents[language];
};

const parseDate = (date) => {
  if (!date) {
    return null;
  }
  const [year, month, day] = date.split("-");
  return new Date(year, month - 1, day);
};

export const getEventSearchResults = async (
  language,
  searchTerms,
  categories,
  locations,
  startDate,
  endDate
) => {
  const allCategories = await getAllEventCategories(language);
  const allLocations = await getAllEventLocations(language);
  const allEvents = await getAllEvents(language);

  const filterCategories = new Set(
    categories.filter((each) => allCategories.includes(each))
  );
  const filterLocations = new Set(
    locations.filter((each) => allLocations.includes(each))
  );

  const filteredEvents = allEvents.filter((each) => {
    const categoryMatch =
      filterCategories.size === 0 || filterCategories.has(each.category);
    const locationMatch =
      filterLocations.size === 0 || filterLocations.has(each.location);
    const startDateMatch =
      startDate === null || parseDate(each.start_date) >= parseDate(startDate);
    const endDateMatch =
      endDate === null || parseDate(each.end_date) <= parseDate(endDate);
    return categoryMatch && locationMatch && startDateMatch && endDateMatch;
  });

  const searchedEvents = getFilteredEvents(filteredEvents, searchTerms);

  // sort by event.start_date in descending order
  const sortedSearchResults = searchedEvents.sort(
    (a, b) => parseDate(b.start_date) - parseDate(a.start_date)
  );

  return sortedSearchResults;
};

export const getAllEventLocations = async (language) => [
  ...new Set((await getAllEvents(language)).map((each) => each.location)),
];

export const getAllEventCategories = async (language) => [
  ...new Set((await getAllEvents(language)).map((each) => each.category)),
];
