import { useCallback } from 'react'

export const useScrollToForm = () => {
  const scrollToForm = useCallback(() => {
    const formElements = document.querySelectorAll('[data-form-service]')

    if (formElements.length > 0) {
      const firstForm = formElements[0] as HTMLElement
      firstForm.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [])

  return scrollToForm
}
