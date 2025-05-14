import RootLayout from "@/components/layout/layout";
import Newsletterform from "@/components/newsletterform";
import TeamsHero from "@/components/teamshero";
import Breadcrumps from "@/components/breadcrumps";
import TeamMembersGrid from "@/components/ui/team-members-grid";
import {
  getDataFromPath,
  getHeaderFooterData,
  getNewsletterData,
} from "../../../utils/api_calls";
import { CacheHeaders } from "../../../utils/definitions";
import { getAllTeams } from "../../../utils/teams";

export default function Teams({ data, allTeams, headerFooter, news }) {
  return (
    <RootLayout seo={data.seo} data={headerFooter}>
      <Breadcrumps items={data.breadcrumps} />
      <TeamsHero data={data} />
      <TeamMembersGrid heading={data.leadershipHeading} allTeams={allTeams} />
      <Newsletterform data={news} />
    </RootLayout>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const language = context.locale;
  const path = "teams-page?&populate=deep";
  const data = await getDataFromPath(path, language);
  const news = await getNewsletterData(language);
  return {
    props: {
      news: news,
      data: data.data.attributes,
      headerFooter: await getHeaderFooterData(language),
      allTeams: await getAllTeams(language),
    },
  };
}
