import { getHeaderFooterData, getDataFromPath } from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";
import RootLayout from "@/components/layout/layout";
import AllCountriesHero from "@/components/ui/all-countries-hero";

export default function AllCountriesPage({ regions, headerFooter }) {
  const seoData = {
    seo_title: "Target Markets | FameTN",
    seo_description:
      "I need to write something here, which i should change later",
    seo_thumbanil: "/",
  };

  return (
    <RootLayout seo={seoData} data={headerFooter}>
      <AllCountriesHero regions={regions} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const language = context.locale;

  const headerFooter = await getHeaderFooterData(language);

  const regionsPath =
    `regions?populate=*&` +
    `populate[countries][populate]=*&` +
    `populate[countries][populate][flag_image]=*&` +
    `populate[countries][populate][hero_image]=*&` +
    `populate[countries][populate][about]=*&`;

  const regionsRes = await getDataFromPath(regionsPath);
  const regions = regionsRes.data || [];

  return {
    props: {
      regions: regions,
      headerFooter: headerFooter,
    },
  };
}
