import RootLayout from "../../components/layout/layout";
import { Container, Row, Col } from "react-bootstrap";
import Gigasearch from "../../components/gigasearch";
import { CacheHeaders } from "../../utils/definitions";
import { getDataFromPath, getTopNBlogs } from "../../utils/api_calls";
import Bluepill from "../../components/bluepill";


export default function Blogs({meta, recentBlogs}) {
    console.log(recentBlogs)
    return (
        <RootLayout>
            <Container>
                <div className="mt-4">
                    <Row>
                        <Col md={11}>
                            <Gigasearch />
                        </Col>
                        <Col md={1}>
                            Filter
                        </Col>
                    </Row>
                </div>

                <div className="mt-4">
                    <center>
                        <Bluepill text={meta?.supertitle} />
                        <h2 className="mt-3 text-uppercase">{meta?.title}</h2>
                        <p>
                            {meta?.description}
                        </p>
                    </center>
                </div>
            </Container>
        </RootLayout>
    )
}

export async function getServerSideProps(context) {

    // add cache headers
    context.res.setHeader('Cache-Control', CacheHeaders);
    const language = context.locale;

    const blogmetaPath = "blogs-meta"
    const meta = await getDataFromPath(blogmetaPath, language);
    const recentBlogs = await getTopNBlogs(3, language);

    // const path = "blogs?&populate=deep";
    // const data = await getDataFromPath(path, language);
    // const news = await getNewsletterData(language);
    return {

        props: {
            meta: meta?.data?.attributes,
            recentBlogs: recentBlogs
            // news: news,
            // data: data.data.attributes
        }
    }
}