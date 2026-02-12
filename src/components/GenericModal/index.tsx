import { X } from 'phosphor-react'
import { ReactNode } from 'react'
import { Spinner } from '../Loading'
import styles from './styles.module.css'

type GenericModalProps = {
  isOpen: boolean
  onCloseModal: () => void
  children: ReactNode
  isLoading: boolean
}

export const GenericModal = ({
  isOpen,
  onCloseModal,
  children,
  isLoading
}: GenericModalProps) => {
  if (!isOpen) return null

  return (
    <div className={styles.container}>
      <div className={styles.modal__backdrop} onClick={onCloseModal} />

      <main className={styles.modal__content} role='dialog' aria-modal='true'>
        <button
          type='button'
          onClick={onCloseModal}
          className={styles.modal__close}
          aria-label='Close section'
        >
          <X size={28} weight='bold' />
        </button>

        <section className={styles.modal__body}>
          {isLoading ? <Spinner /> : children}
        </section>
      </main>
    </div>
  )
}
