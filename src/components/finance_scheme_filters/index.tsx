import Image from "next/image"
import styles from "./filter.module.css"
import { useEffect, useRef, useState } from "react"
import { JSONData } from "@/utils/definitions"
import { Col, Row } from "react-bootstrap";

type MultiSliderCallback = (min: number, max: number) => void;
const MultiRangeSlider = ({ min = 0, max = 100, valueMin = 0, valueMax = 0, defaultMin = 0, defaultMax = 100, onChange = (itemMin: number, itemMax: number) => { } }) => {

    const setMin = (newMinStr: string) => {
        const newMin = parseFloat(newMinStr)
        if (newMin < valueMax) onChange(newMin, valueMax)
    }

    const setMax = (newMaxStr: string) => {
        const newMax = parseFloat(newMaxStr)
        if (newMax > valueMin) onChange(valueMin, newMax)
    }

    return (
        <div className={styles.sliderparent}>
            <input style={{ zIndex: 3 }} className={`${styles.slider}`} onChange={(e) => setMin(e.target.value)} type="range" min={min} max={max} value={valueMin} />
            <input style={{ zIndex: 3 }} className={`${styles.slider}`} onChange={(e) => setMax(e.target.value)} type="range" min={min} max={max} value={valueMax} />
            <div style={{
                left: `${valueMin * 100 / (max - min)}%`,
                width: `${(valueMax - valueMin) * 100 / (max - min)}%`
            }} className={styles.sliderviewer}></div>
            <div className={styles.bgslider}></div>
            <div style={{
                left: `${valueMin * 100 / (max - min)}%`,
            }} className={styles.value}>
                {valueMin}%
            </div>
            <div style={{
                left: `${(valueMax) * 100 / (max - min)}%`,
            }} className={styles.value}>
                {valueMax}%
            </div>
        </div>
    )
}


interface RangeSliderProps {
    min?: number;
    max?: number;
    value?: number;
    onChange?: (newValue: number) => void;
    suffix?: string | null;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min = 0, max = 100, value = 0, onChange = (itemVal: number) => { }, suffix = "%" }) => {

    return (
        <div className={styles.sliderparent}>
            <input style={{ zIndex: 3 }} className={`${styles.slider}`} onChange={(e) => onChange(parseFloat(e.target.value))} type="range" min={min} max={max} value={value} />
            <div style={{
                left: 0,
                width: `${(value - min) * 100 / (max - min)}%`
            }} className={styles.sliderviewer}></div>
            <div className={styles.bgslider}></div>
            {suffix && (<div style={{
                left: `${(value - min) * 100 / (max - min)}%`,
            }} className={styles.value}>
                {value}{suffix}
            </div>)}
        </div>
    )
}


const SubFilter = ({ title, subtitle, children, style }: JSONData) => {
    return (<div>
        <div className={`small ${styles.subfiltertitle}`}>
            {title}
        </div>
        <div style={style} className={`small ${styles.subfiltercontent}`}>
            <div>{subtitle}</div>
            {children}
        </div>
    </div>)
}



export default function FinanceSchemeFilter({ agencies = [], onChange = () => {} }: JSONData) {

    const [isActive, setIsActive] = useState(false);
    const [subsidyRate, setSubsidyRate] = useState([0, 100]);
    const [interestRate, setInterestRate] = useState(100);

    const [agencySelection, setAgencySelection] = useState(Array(agencies.length).fill(true))

    const grantMin = 0;
    const grantMax = 100000;
    const [grant, setGrant] = useState(0);

    useEffect(() => {
        var selectedAgencies: string[] = []
        agencySelection.map((selection: boolean, i: number) => {
            if (selection) selectedAgencies.push(agencies[i])
        })
        onChange(subsidyRate, interestRate, grant, selectedAgencies)
    }, [subsidyRate, interestRate, agencySelection, grant])




    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


    function useOutsideAlerter(ref: JSONData) {
        useEffect(() => {
            function handleClickOutside(event: JSONData) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsActive(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const subsidyRateChanged = (minVal: number, maxVal: number) => {
        setSubsidyRate([minVal, maxVal])
    }

    const interestRateChanged = (val: number) => {
        setInterestRate(val);
    }

    const grantChanged = (val: number) => {
        setGrant(val);
    }

    const grantChangedText = (val: string) => {
        const numVal = parseInt(val)
        if (isNaN(numVal)) return;
        if (numVal >= grantMin && numVal <= grantMax) {
            grantChanged(numVal)
        }
    }


    const toggleSelection = (val: number) => {
        const currentSelection = agencySelection.slice();
        currentSelection[val] = !currentSelection[val];
        setAgencySelection(currentSelection);
    }

    return (
        <div ref={wrapperRef} className={styles.wrap}>
            <div onClick={() => setIsActive(!isActive)} className={styles.filter_button}>
                <div className="my-auto me-1">
                    <Image
                        src="/filter.svg"
                        alt="->"
                        width={20}
                        height={20}
                    />
                </div>
                <div className="my-auto ms-1">
                    Filters
                </div>

            </div>
            {isActive && (<div className={styles.filterbox}>
                <SubFilter title="Subsidy Rate" subtitle="Set rate value:">
                    <MultiRangeSlider valueMin={subsidyRate[0]} valueMax={subsidyRate[1]} onChange={subsidyRateChanged} />
                </SubFilter>
                <SubFilter title="Interest Rate" subtitle="Set rate value:">
                    <RangeSlider value={interestRate} onChange={interestRateChanged} />
                </SubFilter>
                <SubFilter title="Grants">
                    <Row>
                        <Col style={{ marginBottom: 0, paddingRight: 0 }} sm={7}>
                            <div className="mt-2">
                                <RangeSlider value={grant} min={grantMin} max={grantMax} onChange={grantChanged} suffix={null} />
                            </div>
                        </Col>
                        <Col style={{ marginBottom: 0 }} sm={5}>
                            <div className={styles.inputtext}>
                                <div>₹</div>
                                <div><input className={styles.inputcore} type="text" onChange={(e) => grantChangedText(e.target.value)} value={grant} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </SubFilter>

                <SubFilter style={{ padding: 0 }} title="Departments">
                    <div className={styles.depts}>
                        {agencies.map((agency: string, i: number) => {
                            return (<div onClick={() => toggleSelection(i)} className={`${agencySelection[i] ? styles.deptactive : styles.deptinactive}  ${styles.deptitem}`} key={i}>
                                <div className="me-1">{agencySelection[i] ? (
                                    <Image
                                        style={{
                                            marginLeft: "10px",
                                            marginRight: "10px"
                                        }}
                                        src="/tick.svg"
                                        alt="->"
                                        width={16}
                                        height={16}
                                    />
                                ) : (
                                    <Image
                                        style={{
                                            marginLeft: "10px",
                                            marginRight: "10px"
                                        }}
                                        src="/notick.svg"
                                        alt="->"
                                        width={16}
                                        height={16}
                                    />)}</div> <div>{agency}</div>
                            </div>)
                        })}
                    </div>
                </SubFilter>

            </div>)}

        </div>
    )
} 