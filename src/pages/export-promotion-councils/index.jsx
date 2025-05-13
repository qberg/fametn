import { Container } from "react-bootstrap";
import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import {
  getDataFromPath,
  getHeaderFooterData,
  getNewsletterData,
} from "../../utils/api_calls";
import Breadcrumps from "../../components/breadcrumps";
import YellowBlobHero from "@/components/yellowblobhero";
import PartnersSection from "@/components/partners";
import EmarketsImageGallery from "../../components/emarketsImageGallery";
import ThreeChannel from "@/components/threechannel";
import UpcomingEvents from "../../components/upcoming_events";
import RecentBlogsGrid from "../../components/recentblogsgrid";
import Testimonials from "../../components/testimonials";
import MiniResources from "../../components/miniresources";
import FaqComponent from "../../components/faqcomponent";
import Newsletterform from "../../components/newsletterform";
import { getAllExportCouncils } from "../../utils/export_councils";
import CouncilBlock from "../../components/council_block";
import YellowSchemes from "../../components/yellow_schemes";

export default function ExportPromotionCouncils({
  news,
  data,
  councils,
  headerFooter,
}) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <Breadcrumps items={data.breadcrumps} />
      <YellowBlobHero hero={data.hero} hero_imgs={data.heroimg} />
      <ThreeChannel data={data.threechannel} ctaEnabled={false} />
      <PartnersSection heading={data.partners_title} data={data.partners} />
      <CouncilBlock data={councils} header={data.section_3} />
      <UpcomingEvents
        data={data.events.events.data.map((each) => each.attributes)}
        meta={data.events}
      />
      <YellowSchemes
        data={data.finance_schemes}
        header={data.section_4}
        cta={data.section_4_cta}
      />
      <RecentBlogsGrid blogs={data.blogs} />
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
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "export-promotion-council?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  const news = await getNewsletterData(language);
  const councils = await getAllExportCouncils(language);
  return {
    props: {
      news: news,
      data: data.data.attributes,
      councils: councils,
      headerFooter: await getHeaderFooterData(language),
    },
  };
}

