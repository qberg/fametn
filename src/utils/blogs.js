import { getDataFromPath } from "./api_calls";

// create a cache of all blogs
var allBlogs = {
  en: [],
  ta: [],
};

var lastUpdated = new Date(0);

const getFilteredBlogs = (allBlogs, searchWords) => {
  if (!searchWords || typeof searchWords !== "string") {
    return allBlogs;
  }

  // Split searchWords into individual words, remove extra spaces, and convert to lowercase
  const words = searchWords
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return allBlogs;
  }

  // Define weights for different fields
  const weights = {
    title: 5,
    author: 3,
    excerpt: 2,
    content: 1, // Assuming there's a content field
  };

  const countOccurrences = (text, word) => {
    if (!text) return 0;
    const regex = new RegExp(`\\b${word}\\b`, "gi"); // Match whole words, case-insensitive
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  };

  // Map each blog to a relevance score
  const scoredBlogs = allBlogs.map((blog) => {
    let score = 0;

    words.forEach((word) => {
      // Count matches in each field and multiply by weight
      score +=
        countOccurrences(blog.title, word) * weights.title ||
        countOccurrences(blog.author, word) * weights.author ||
        countOccurrences(blog.excerpt, word) * weights.excerpt;
      // Add more fields if necessary
    });

    return { ...blog, relevanceScore: score };
  });

  //   scoredBlogs.forEach((blog) => {
  // 	console.log(blog.title, blog.relevanceScore);
  //   })

  // Filter out blogs with zero score and sort by descending score
  const filteredAndRankedBlogs = scoredBlogs
    .filter((blog) => blog.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  return filteredAndRankedBlogs;
};

const sortBlogs = (allBlogs, sortCol, ascending = true) => {
  if (!sortCol || typeof sortCol !== "string" || sortCol.length === 0) {
    return allBlogs;
  }

  const blogsCopy = [...allBlogs];

  blogsCopy.sort((a, b) => {
    const valA = a[sortCol];
    const valB = b[sortCol];

    // Handle undefined or null values by placing them at the end
    if (valA === undefined || valA === null) return 1;
    if (valB === undefined || valB === null) return -1;

    // Determine the type of the sort column
    const typeA = typeof valA;
    const typeB = typeof valB;

    // If types are different, convert both to strings for comparison
    if (typeA !== typeB) {
      return ascending
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    }

    // For strings, perform case-insensitive comparison
    if (typeA === "string") {
      const comparison = valA.toLowerCase().localeCompare(valB.toLowerCase());
      return ascending ? comparison : -comparison;
    }

    // For numbers, perform numerical comparison
    if (typeA === "number") {
      return ascending ? valA - valB : valB - valA;
    }

    // For dates, parse and compare
    if (Date.parse(valA) && Date.parse(valB)) {
      const dateA = new Date(valA);
      const dateB = new Date(valB);
      return ascending ? dateA - dateB : dateB - dateA;
    }

    // Fallback to string comparison
    const comparison = String(valA).localeCompare(String(valB));
    return ascending ? comparison : -comparison;
  });

  return blogsCopy;
};

export const getBlogList = async (
  language,
  searchWords,
  sortCol,
  ascending = true,
  page = 1,
  pageSize = 9
) => {
  const allBlogList = await getAllBlogs(language);
  const filteredBlogList = getFilteredBlogs(allBlogList, searchWords);
  const sortedBlogList = sortBlogs(filteredBlogList, sortCol, ascending);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedBlogList = sortedBlogList.slice(start, end);
  return {
    totalPages: Math.ceil(sortedBlogList.length / pageSize),
    currentPage: page,
    blogs: paginatedBlogList,
  };
};

export const getBlog = async (language, url) => {
	const path = "blogs?populate=deep&filters[url][$eq]=" + url;
	const rawData = await getDataFromPath(path, language);
	return rawData?.data?.[0]?.attributes;
}

export const getAllBlogsFromStrapi = async (language) => {
  console.log("Getting all blogs from strapi");
  const maxPageSize = 1;
  const path =
    "blogs?sort=date:desc&fields[0]=title&fields[1]=author&fields[2]=date&fields[3]=excerpt&fields[4]=url&populate[0]=image&populate[1]=tags&pagination[pageSize]=" +
    maxPageSize;

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

export const getAllBlogs = async (language) => {
  // if cache is empty, get all blogs and return
  if (allBlogs[language].length === 0) {
    console.log("Cache is empty");
    allBlogs[language] = await getAllBlogsFromStrapi(language);
    lastUpdated = new Date();
    return allBlogs[language];
  }

  // if cache is not empty, check if cache is stale
  const now = new Date();
  const staleTime = 1000 * 60 * 2; // 2 mins
  if (now - lastUpdated > staleTime) {
    // cache is stale
    console.log("Cache is stale");
    allBlogs[language] = await getAllBlogsFromStrapi(language);
    lastUpdated = now;
    return allBlogs[language];
  }

  // cache is not stale
  console.log("Cache is not stale");
  return allBlogs[language];
};

export const getTopNBlogs = async (language) => {
  const N = 3;
  const path =
    "blogs?sort=date:desc&pagination[limit]=" +
    N +
    "&fields[0]=title&fields[1]=author&fields[2]=date&fields[3]=excerpt&fields[4]=url&populate[0]=image&populate[1]=tags";
  const rawData = await getDataFromPath(path, language);
  return rawData?.data?.map((each) => each.attributes);
};
