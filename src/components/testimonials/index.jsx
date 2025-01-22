import { Col, Container, Row } from "react-bootstrap"
import styles from "./testimonials.module.css"
import { useRouter } from "next/router"
import DynamicImage from "../dynamicImage"

const strings = {
    "testimonials": {
        "en": "Testimonials",
        "ta": "மதிப்பீடுகள்"
    },
    "words": {
        "en": "Some words from our founders",
        "ta": "எங்கள் துணையர்களிடமிருந்து சில வார்த்தைகள்"
    }
}

function Testimonial({ data }) {

    const isVideoTestimonial = data.video_testimonial?.data != null;

    const VideoTestimonial = ({videoData}) => {
        const videoUrl = process.env.NEXT_PUBLIC_IMG_ENDPOINT + videoData.url;
        const videoType = videoData.mime;
        return (
            <div className={styles.videocontainer}>
                <video className={styles.actualVideo} controls>
                    <source src={videoUrl} type={videoType} />
                </video>
            </div>
        )
    }


    return (
        <div className={styles.testimonialbox} lg={12}>
            <div className="d-flex">
                <div className={styles.profilepic}>
                    <DynamicImage src={data.profile_pic} objectFit="cover" />
                </div>
                <div className="ms-3 my-auto">
                    <div>
                        {data.name}
                    </div>
                    <div className="small">
                        {data.position}
                    </div>
                </div>
            </div>

            {!isVideoTestimonial && (<p className="mt-3 mb-0 small">
                {data.description}
            </p>)}

            {isVideoTestimonial && (<div className="mt-3">
                
                <VideoTestimonial videoData={data.video_testimonial.data.attributes} />
            </div>)}
            {/* {data.description} */}
        </div>

    )
}

export default function Testimonials({ data, title, subtitle }) {

    const { locale } = useRouter()

    const scoringFunction = (testimonial) => {
        if (testimonial.video_testimonial?.data != null) {
            return 2 + 8;
        }
        else {
            return 2 + Math.ceil(0.023 * testimonial.description.length);
        }
    }

    const splitEqualScore = (testimonials, numSplits) => {
        var currentScores = Array(numSplits).fill(0);
        var results = Array.from({ length: numSplits }, () => []);
        for (var i = 0; i < testimonials.length; i++) {
            var testimonial = testimonials[i];
            var minIndex = currentScores.indexOf(Math.min(...currentScores));
            currentScores[minIndex] += testimonial.score;

            results[minIndex].push(testimonial);
        }
        return results;
    }

    const allTestimonialsWithScore = data.data.map(each => {
        return {
            ...each.attributes,
            score: scoringFunction(each.attributes)
        }
    })

    const numColumns = 3;

    const splitedTestimonials = splitEqualScore(allTestimonialsWithScore, numColumns);



    return (
        <Container>
            <div className="my-5">
                <center>
                    <div className={styles.boxed}>
                        {title || strings.testimonials[locale]}
                    </div>
                    <h2 className="mt-3">
                        {subtitle || strings.words[locale]}
                    </h2>
                </center>
                <Row className="mt-4">
                    {splitedTestimonials.map((each, index) => {
                        return (
                            <Col className={styles.nomb} lg={4} key={index}>
                                {each.map((testimonial, index) => {
                                    return (
                                        <Testimonial key={index} data={testimonial} />
                                    )
                                })}
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </Container>
    )

}