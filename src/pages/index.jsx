import HeroSection2 from "../components/herosection2";
import HomeHero from "../components/homehero";
import RootLayout from "../components/layout/layout";
import { getDataFromPath } from "../utils/api_calls";
import { CacheHeaders } from "../utils/definitions";
import HeroBlues from "../components/heroblues";
import HeroGrids from "../components/herogrids";
import HeroBlack from "../components/heroblack";
import HeroLast from "../components/herolast";


export default function Home({ data }) {
	return (
		<RootLayout>
			<HomeHero
				title={data.title}
				options={data.options}
				option_cta={data.option_cta}
				option_cta_default={data.option_cta_default}
				option_header={data.option_header}
				hero_pills={data.hero_pills}
			/>
			<HeroSection2 data={data.section_2} />
			<HeroBlues datatop={data.section_3} databottom={data.section_3_bot} />
			<HeroGrids data={data.section_4} />
			<HeroBlack data={data.section_black} />
			<HeroLast data={data.section_last} />
		</RootLayout>
	);
}


export async function getServerSideProps(context) {
	// add cache headers
	context.res.setHeader('Cache-Control', CacheHeaders);

	const path = "homepage?&populate=deep";
	const language = context.locale;
	const data = await getDataFromPath(path, language);

	return {
		props: {
			data: data.data.attributes,
		},
	}
}