import RootLayout from "@/components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getHeaderFooterData } from "../../../utils/api_calls";
import PartnersSection from "@/components/partners";
import UpcomingEvents from "@/components/upcoming_events";
import RecentBlogsGrid from "@/components/recentblogsgrid";
import { getAllAuditors } from "../../../utils/auditors";
import Auditors from "@/components/auditors";
import ContentHero from "@/components/ui/content-hero";
import ColorBlockCard from "../../../components/ui/color-block-card";
import MinimalResourcesBlock from "../../../components/ui/minimal-resources-block";
import MinimalSchemesBlock from "../../../components/ui/minimal-schemes-block";

export default function EnergyEfficiency({ data, auditors, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <ContentHero {...data.hero} breadcrumps={data.breadcrumps} />
      <PartnersSection heading={data.partner_title} data={data.partners} />
      <UpcomingEvents
        data={data.events.events.data.map((each) => each.attributes)}
        meta={data.events}
      />
      <ColorBlockCard {...data.section_2} />
      <Auditors data={auditors} />

      <MinimalSchemesBlock
        header={data.schemes_header}
        cta={data.schemes_cta}
        schemes={data.finance_schemes}
      />
      <MinimalResourcesBlock {...data.resourcesblock} />
      <RecentBlogsGrid blogs={data.blogs} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "energy-efficiency?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  const auditors = await getAllAuditors(language);

  return {
    props: {
      auditors: auditors,
      data: data.data.attributes,
      headerFooter: await getHeaderFooterData(language),
    },
  };
}
