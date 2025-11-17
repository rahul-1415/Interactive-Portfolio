import styles from './styles.module.css'

export const ContactModal = () => {
  return (
    <section className={styles.contact__container}>
      <h1 className={styles.contact__title}>Contact</h1>
      
      <div className={styles.contact__info}>
        <a 
          href="mailto:rahulb1407@gmail.com" 
          className={styles.contact__link}
        >
          rahulb1407@gmail.com
        </a>
        
        <a 
          href="tel:+16025171962" 
          className={styles.contact__link}
        >
          +16025171962
        </a>
      </div>
    </section>
  )
}

