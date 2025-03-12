import RootLayout from "@/components/layout/layout";
import { CacheHeaders } from "../../../../utils/definitions";
import {
  getDataFromPath,
  getHeaderFooterData,
} from "../../../../utils/api_calls";
import CountryHero from "@/components/ui/country-hero";

export default function CountryPage({ country, headerFooter }) {
  const seoData = {
    seo_title: `Japan`,
    seo_description: "Explore the country",
    seo_thumbnail: "/",
  };

  return (
    <RootLayout seo={seoData} data={headerFooter}>
      <CountryHero {...country[0].attributes} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);
  const language = context.locale;

  const countrySlug = context.params.country;
  const countryPath =
    `countries?filters[slug][$eq]=${countrySlug}&` +
    `populate[flag_image]=*&` +
    `populate[map_image]=*&` +
    `populate[hero_image]=*&` +
    `populate[stats]=*&` +
    `populate[about]=*&`;

  const countryRes = await getDataFromPath(countryPath);
  const country = countryRes.data || [];

  const headerFooter = await getHeaderFooterData(language);

  return {
    props: {
      country: country,
      headerFooter: headerFooter,
    },
  };
}
