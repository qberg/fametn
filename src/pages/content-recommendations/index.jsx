import RootLayout, { MinLayout } from "../../components/layout/layout";
import RecoBlocks from "../../components/ui/reco-blocks";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";
import { CacheHeaders } from "../../utils/definitions";

export default function ContentRecoPage({ data, themes }) {
  return (
    <MinLayout seo={data.seo}>
      <RecoBlocks
        title={data.leftBlock.Title}
        themes={themes}
        rightBlock={data.rightBlock}
      />
    </MinLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const path = "content-recommendations?&populate=deep";
  const language = context.locale;
  const data = await getDataFromPath(path, language);

  const themesPath = "themes?populate=*";
  const themesResponse = await getDataFromPath(themesPath, language);
  const themes = themesResponse.data || [];

  return {
    props: {
      data: data.data.attributes,
      themes: themes,
      headerFooter: await getHeaderFooterData(language),
    },
  };
}
