import RootLayout from "@/components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getHeaderFooterData } from "@/utils/api_calls";
import PartnersSection from "@/components/partners";
import RecentBlogsGrid from "@/components/recentblogsgrid";
import ContentHero from "../../../components/ui/content-hero";
import MinimalEvents from "../../../components/ui/minimal-events";

export default function Industry4PointO({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <ContentHero {...data.hero} breadcrumps={data.breadcrumps} />
      <PartnersSection heading={data.partner_title} data={data.partners} />
      <MinimalEvents
        events={data.events.events.data.map((each) => each.attributes)}
        title={data.events.title_2}
        description={data.events.description_2}
      />
      <RecentBlogsGrid blogs={data.blogs} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "industry-4-0?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  return {
    props: {
      data: data.data.attributes,
      headerFooter: await getHeaderFooterData(language),
    },
  };
}
