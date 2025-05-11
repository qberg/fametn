import RootLayout from "@/components/layout/layout";
import { getDataFromPath, getHeaderFooterData } from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";

export default function ThemePage({ theme, headerFooter }) {
  const seoData = {
    seo_title: `${theme.name} - Content Recommendations`,
    seo_description: "Explore all relevant content",
  };

  return (
    <RootLayout seo={seoData} data={headerFooter}>
      <pre>{JSON.stringify(theme, null, 2)}</pre>
      <pre>{JSON.stringify(theme, null, 2)}</pre>
      <h1>{theme.name}</h1>
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const themeSlug = context.params.theme;
  const language = context.locale;

  const themePath = `themes?filters[slug][$eq]=${themeSlug}&populate=deep`;
  const themeResponse = await getDataFromPath(themePath, language);

  const themeData = themeResponse?.data[0].attributes || {};

  const headerFooter = await getHeaderFooterData(language);

  return {
    props: {
      theme: themeData,
      headerFooter: headerFooter,
    },
  };
}
