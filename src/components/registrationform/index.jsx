import styles from "./registrationform.module.css";
import WhiteButton from "@/components/whitebutton";


const RegistrationForm = ({ data }) => {
    return (
        <div className="py-5">
            <center>
                <h2 data-aos="fade-up">
                    {data.title}
                </h2>
                <p data-aos="fade-up">
                    {data.description}
                </p>
                <div data-aos="fade-up">
                    <WhiteButton text={data.cta_text} url={data.cta_link} />
                </div>
            </center>
        </div>
    )
}

module.exports = RegistrationForm;