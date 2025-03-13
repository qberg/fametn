import RootLayout from "@/components/layout/layout";
import { CacheHeaders } from "../../../../utils/definitions";
import {
  getDataFromPath,
  getHeaderFooterData,
} from "../../../../utils/api_calls";
import CountryHero from "@/components/ui/country-hero";
import InfoBentoGrid from "@/components/ui/info-bento-grid";

export default function CountryPage({ country, headerFooter }) {
  const seoData = {
    seo_title: `${country[0].attributes.name}`,
    seo_description: "Explore the country",
    seo_thumbnail: "/",
  };

  const about = country[0].attributes.about || [];

  return (
    <RootLayout seo={seoData} data={headerFooter}>
      <CountryHero {...country[0].attributes} />
      {about && <InfoBentoGrid {...about} />}
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
