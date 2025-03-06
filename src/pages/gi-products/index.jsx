import RootLayout from "../../components/layout/layout";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import HeroWithVideo from "@/components/ui/hero-with-video";
import OverviewWithImages from "@/components/ui/overview-with-images";
import GICategoriesGrid from "@/components/ui/gi-categories-grid";

export default function GIProductsPage({ data, categories, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      {data.hero && <HeroWithVideo {...data.hero} />}
      {data.overview && <OverviewWithImages {...data.overview} />}
      {categories && (
        <GICategoriesGrid
          heading={data.categories_header.heading}
          description={data.categories_header.description}
          categories={categories}
        />
      )}
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "gi-products-page?&populate=deep";
  const language = context.locale;

  const data = await getDataFromPath(path, language);
  const headerFooter = await getHeaderFooterData(language);

  // fetching all categories
  const categoriesPath = "gi-products-categories?populate=*";
  const categiresResponse = await getDataFromPath(categoriesPath, language);
  const categories = categiresResponse.data || [];

  return {
    props: {
      data: data.data.attributes,
      categories: categories,
      headerFooter: headerFooter,
    },
  };
}
