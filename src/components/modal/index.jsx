import styles from './modal.module.css';

export default function Modal({ text, show }) {
    return (
    <div data-shono={show} className={styles.modal}>
        {text}
    </div>)
}