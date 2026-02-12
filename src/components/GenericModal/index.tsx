import { X } from 'phosphor-react'
import { ReactNode, useEffect, useRef } from 'react'
import { Spinner } from '../Loading'
import styles from './styles.module.css'

type GenericModalProps = {
  isOpen: boolean
  onCloseModal: () => void
  children: ReactNode
  isLoading: boolean
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

export const GenericModal = ({
  isOpen,
  onCloseModal,
  children,
  isLoading
}: GenericModalProps) => {
  const modalRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    restoreFocusRef.current = document.activeElement as HTMLElement

    const originalBodyOverflow = document.body.style.overflow
    const originalBodyTouchAction = document.body.style.touchAction

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    closeButtonRef.current?.focus()

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseModal()
        return
      }

      if (event.key !== 'Tab') return

      const modalElement = modalRef.current
      if (!modalElement) return

      const focusable = Array.from(
        modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
      ).filter(element => !element.hasAttribute('disabled'))

      if (focusable.length === 0) {
        event.preventDefault()
        closeButtonRef.current?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement

      if (event.shiftKey && current === first) {
        event.preventDefault()
        last.focus()
        return
      }

      if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.body.style.touchAction = originalBodyTouchAction
      document.removeEventListener('keydown', handleKeydown)
      restoreFocusRef.current?.focus()
    }
  }, [isOpen, onCloseModal])

  if (!isOpen) return null

  return (
    <div className={styles.container}>
      <div className={styles.modal__backdrop} onClick={onCloseModal} />

      <main
        ref={modalRef}
        className={styles.modal__content}
        role='dialog'
        aria-modal='true'
      >
        <button
          ref={closeButtonRef}
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
