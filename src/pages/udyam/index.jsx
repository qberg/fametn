import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "@/utils/definitions";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";

import ThreeChannel from "@/components/threechannel";
import TimeLine from "../../components/ui/timeline";
import FaqComponent from "../../components/faqcomponent";
import HeroWithStats from "../../components/ui/hero-with-stats";

export default function BizBuddy({ data, headerFooter }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <HeroWithStats {...data.hero} breadcrumps={data.breadcrumps} />
      <ThreeChannel data={data.threeChannel} ctaEnabled={true} />
      <TimeLine
        heading={data.howToApply}
        description={data.howToApplyDescription}
        items={data.stepsToApply}
      />
      <FaqComponent data={data.faq} marked={true} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "udyam?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);

  return {
    props: {
      data: data.data.attributes,
      headerFooter: await getHeaderFooterData(language),
    },
  };
}
