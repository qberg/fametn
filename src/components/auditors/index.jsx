import { CoreTable } from "../investment_providers";

export default function Auditors({data, title, supertitle}) {
    const headings = [
        {
            index: "aea",
            en: "AEA",
            ta: "AEA"
        },
        {
            index: "name",
            en: "Name of the Accredited Energy Auditors",
            ta: "மதிப்பீடு செய்யப்பட்ட ஊழியர்களின் பெயர்"
        },
        {
            index: "reg",
            en: "EA Registration No",
            ta: "EA பதிவு எண்"
        },
        {
            index: "trade",
            en: "Trade Name/Firm under which Energy audit will be Conducted",
            ta: "ஊழியர்படுத்தப்படும் வர்த்தகப் பெயர் / நிறுவல்"
        },
        {
            index: "address",
            en: "Office Postal Address and Contact Details",
            ta: "அலுவலக அஞ்சல் முகவரி மற்றும் தொடர்பு விபரங்கள்"
        },
        {
            index: "sector",
            en: "Sector in which the energy auditor has conducted energy audits in past",
            ta: "ஊழியர் கடந்து ஊழியர்படுத்திய பின்னணி"
        }
    ]
    // return (<div>
    //     hi fellas
    // </div>)
    return (<CoreTable data={data} headings={headings} title={title} supertitle={supertitle}/>)
}