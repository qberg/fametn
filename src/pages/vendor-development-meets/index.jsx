import RootLayout from "../../components/layout/layout";
import {
  getDataFromPath,
  getHeaderFooterData,
  getNewsletterData,
} from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";
import Breadcrumps from "../../components/breadcrumps";
import YellowBlobHero from "@/components/yellowblobhero";
import PartnersSection from "@/components/partners";
import ThreeChannel from "@/components/threechannel";

import { parseMetaAndData } from "../../utils/events";
import UpcomingEvents from "../../components/upcoming_events";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import Testimonials from "../../components/testimonials";
import MiniResources from "../../components/miniresources";
import FaqComponent from "../../components/faqcomponent";
import Newsletterform from "../../components/newsletterform";

export default function VendorDevelopmentMeets({
  news,
  data,
  metaEvents,
  upcomingEvents,
  headerFooter,
}) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <Breadcrumps items={data.breadcrumps} />
      <YellowBlobHero hero={data.hero} hero_imgs={data.hero_images} />
      <ThreeChannel data={data.section_3_cards} ctaEnabled={false} />
      <PartnersSection heading={data.section_2_heading} data={data.partners} />
      <UpcomingEvents data={upcomingEvents} meta={metaEvents} />
      <RecentBlogsGrid blogs={data.recent_blogs} />
      <Testimonials
        data={data.testimonials}
        title={data.testimonial_title}
        subtitle={data.testimonial_subtitle}
      />
      <MiniResources data={data.resources} />
      <FaqComponent data={data.faq} />
      <Newsletterform data={news} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  // add cache headers
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "vendordevelopmentmeets?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);

  const { metaEvents, upcomingEvents } = parseMetaAndData(
    data.data.attributes.events,
  );

  const news = await getNewsletterData(language);

  // const metaEvents = await getDataFromPath("events-meta", language)
  // const upcomingEvents = await getUpComingNEvents(language)

  return {
    props: {
      metaEvents: metaEvents,
      upcomingEvents: upcomingEvents,
      news: news,
      data: data.data.attributes,
      headerFooter: await getHeaderFooterData(language),
    },
  };
}

