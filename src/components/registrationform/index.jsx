import styles from "./registrationform.module.css";
import WhiteButton from "@/components/whitebutton";


const RegistrationForm = ({ data }) => {
    console.log(data);

    return (
        <div className="py-5">
            <center>
                <h3>
                    {data.title}
                </h3>
                <p>
                    {data.description}
                </p>
                <div>
                    <WhiteButton text={data.cta_text} url={data.cta_link} />
                </div>
            </center>
        </div>
    )
}

module.exports = RegistrationForm;