import styles from './styles.module.css'

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner__ring} />
      <div className={styles.spinner__ringAlt} />
      <span className={styles.spinner__dot} />
      <span className={styles.spinner__dot} />
      <span className={styles.spinner__dot} />
      <span className={styles.spinner__dot} />
    </div>
  )
}
