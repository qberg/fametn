import { Container } from "react-bootstrap";
import Bluepill from "../bluepill";
import { CoreTable } from "../investment_providers";

export default function TestinglabsTable({ header, data }) {

    const headings = [
        {
            index: "name",
            en: "Lab Name",
            tn: "லேப் பெயர்"
        },
        {
            index: "services",
            en: "Services",
            tn: "சேவைகள்"
        },
        {
            index: "person",
            en: "Contact Person",
            tn: "தொடர்பு நபர்"
        },
        {
            index: "phone",
            en: "Phone",
            tn: "தொலைபேசி"
        },
        {
            index: "email",
            en: "Email",
            tn: "மின்னஞ்சல்"
        }
    ]
    return (
        <Container className="my-5 py-5">
            <Bluepill text={header.subtitle} />
            <h2 data-aos="fade-up" className="mt-3">
                {header.title}
            </h2>
            <p data-aos="fade-up">
                {header.description}
            </p>
            <div className="mt-5">
                <CoreTable data={data} headings={headings} />
            </div>
        </Container>)
}