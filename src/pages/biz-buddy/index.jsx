import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";

import Breadcrumps from "../../components/breadcrumps";
import YellowBlobHero from "@/components/yellowblobhero";
import ThreeChannel from "@/components/threechannel";
import TimeLine from "../../components/ui/timeline";
import FaqComponent from "../../components/faqcomponent";

export default function BizBuddy({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <Breadcrumps items={data.breadcrumps} />
      <YellowBlobHero hero={data.hero} hero_imgs={data.heroimage} />
      <ThreeChannel data={data.threeChannel} ctaEnabled={false} />
      <TimeLine
        heading={data.howToApplyHeading}
        description={data.howToApplyDescription}
        items={data.stepsToApply}
      />
      <FaqComponent data={data.faq} marked={true} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "biz-buddy?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);

  return {
    props: {
      data: data.data.attributes,
      headerFooter: await getHeaderFooterData(language),
    },
  };
}
