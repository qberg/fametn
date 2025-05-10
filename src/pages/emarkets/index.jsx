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

export default function Emarkets({ news, data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <Breadcrumps items={data.breadcrumps} />
      <YellowBlobHero hero={data.hero} hero_imgs={data.heroimage} />
      <PartnersSection heading={data.partners_title} data={data.partners} />
      <EmarketsImageGallery
        title={data.image_gallery_title}
        description={data.image_gallery_description}
        images={data.image_gallery}
      />
      <ThreeChannel data={data.section_3} ctaEnabled={false} />
      <UpcomingEvents
        data={data.events.events.data.map((each) => each.attributes)}
        meta={data.events}
      />
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
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "emarkets?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);
  const news = await getNewsletterData(language);

  return {
    props: {
      news: news,
      data: data.data.attributes,
      headerFooter: await getHeaderFooterData(language),
    },
  };
}

