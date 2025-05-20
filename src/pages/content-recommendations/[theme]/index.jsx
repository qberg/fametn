import { getDataFromPath } from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";
import { MinLayout } from "../../../components/layout/layout";
import ThemeBlocks from "../../../components/ui/theme-blocks";

export default function ThemePage({ theme }) {
  const seoData = {
    seo_title: `${theme.name} - Content Recommendations`,
    seo_description: "Explore all relevant content",
  };

  return (
    <MinLayout seo={seoData}>
      <ThemeBlocks {...theme} />
    </MinLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const themeSlug = context.params.theme;
  const language = context.locale;

  const themePath = `themes?filters[slug][$eq]=${themeSlug}&populate=deep`;
  const themeResponse = await getDataFromPath(themePath, language);

  const themeData = themeResponse?.data[0].attributes || {};

  return {
    props: {
      theme: themeData,
    },
  };
}
