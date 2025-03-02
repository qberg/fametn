import RootLayout from "../../components/layout/layout";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import HeroWithVideo from "@/components/ui/hero-with-video";
import OverviewWithImages from "@/components/ui/overview-with-images";

export default function GIProductsPage({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      {data.hero && <HeroWithVideo {...data.hero} />}
      {data.overview && <OverviewWithImages {...data.overview} />}
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "gi-products-page?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  const headerFooter = await getHeaderFooterData(language);

  return {
    props: {
      data: data.data.attributes,
      headerFooter: headerFooter,
    },
  };
}
