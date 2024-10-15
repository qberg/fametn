import Flathero from "../../components/flathero";
import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "../../utils/definitions";
import { getDataFromPath } from "../../utils/api_calls";
export default function Markets({ data }) {
    return (
        <RootLayout>
            <Flathero hero={data.hero} heroimg={data.heroimg} heronumbers={data.heronumbers} />
        </RootLayout>
    )
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);

    const path = "markets?&populate=deep";
    const language = context.locale;
    const data = await getDataFromPath(path, language);
    console.log("HI", data.data.attributes)

    return {

        props: {
            data: data.data.attributes
        }
    }
};