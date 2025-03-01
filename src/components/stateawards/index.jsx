import exp from "constants"
import styles from "./styles.module.css"
import { Container } from "react-bootstrap"
import Bluepill from "../bluepill"
import { CoreTable } from "../investment_providers"

export function AwardTableHeaders({ heading }) {
    return (<>
        <Bluepill text={heading.heading} />
        <hr></hr>
        <h2>
            {heading.description}
        </h2>
    </>)
}

export function OtherAwards({heading, data}) {
    const headings = [
        {
            index: "udyam",
            en: "Udyam Registration No.",
            tn: "உத்யம் பதிவு எண்"
        },
        {
            index: "enterprise",
            en: "Enterprise Name",
            tn: "நிறுவனம் பெயர்"
        },
        {
            index: "enterpreneur",
            en: "Entrepreneur Name",
            tn: "தொழில்முனைவோர் பெயர்"
        },
        {
            index: "activity",
            en: "Line of Activity",
            tn: "செயல்பாடு"
        },
        {
            index: "type",
            en: "Type of MSME",
            tn: "MSME வகை"
        },
        {
            index: "mobile",
            en: "Mobile",
            tn: "மொபைல்"
        },
        {
            index: "email",
            en: "Email",
            tn: "மின்னஞ்சல்"
        },
        {
            index: "marks",
            en: "Marks",
            tn: "மதிப்பெண்"
        }
    ]

    return (
        <CoreTable supertitle={heading.heading} title={heading.description} maxPageSize={9} data={data} headings={headings} />
    )
}


export default function StateAwards({ heading, data }) {
    const headings = [
        {
            index: "name",
            en: "Name of the Award",
            tn: "பதக்கம் பெயர்"
        },
        {
            index: "year",
            en: "Year",
            tn: "ஆண்டு"
        },
        {
            index: "awardee",
            en: "Name of the Awardee",
            tn: "பதக்கம் பெற்றவர் பெயர்"
        }
    ]

    return (
        <CoreTable supertitle={heading.heading} title={heading.description} maxPageSize={9} data={data} headings={headings} />
    )
}