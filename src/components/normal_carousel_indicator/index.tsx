import styles from "./indicator.module.css"

const RenderIndicator = (
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
    label: string) => {

    return (<div className={`${isSelected? styles.selected : styles.others} ${styles.indicatorWrap}`} onClick={clickHandler}>
    </div>)
}

export default RenderIndicator;