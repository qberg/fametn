import styles from "./styles.module.css"


export default function EvHeading({text}) {
    return (<div data-aos="fade-up">
        <div className="d-flex">
            <div className="my-auto">
                <div className={styles.line}>

                </div>
            </div>
            <div className="my-auto">
                <h5 className={styles.text}>
                    {text}
                </h5>
            </div>
        </div>
    </div>)
}