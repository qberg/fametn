import { getDataFromPath, getHeaderFooterData } from "../../../utils/api_calls";
import RootLayout from "@/components/layout/layout";
import { CacheHeaders } from "../../../utils/definitions";
import HeroWithCard from "../../../components/ui/hero-with-card";

export default function Countries({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <HeroWithCard {...data.hero} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "countries-page?&populate=deep";
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
