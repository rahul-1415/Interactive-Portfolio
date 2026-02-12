import { Html, useProgress } from '@react-three/drei'
import { Spinner } from './Spinner'
import styles from './styles.module.css'

const SplashScreen = () => {
  const { progress } = useProgress()

  return (
    <Html center className={styles.loading__container}>
      <Spinner />

      <div className={styles.loading__textBlock}>
        <h1 className={styles.loading__title}>Charting the waters...</h1>
        <p className={styles.loading__subtitle}>Loading world assets and interaction systems</p>
      </div>

      <span className={styles.percentage}>
        {Math.floor(progress)}%
      </span>
    </Html>
  )
}

export {
  SplashScreen,
  Spinner
}
