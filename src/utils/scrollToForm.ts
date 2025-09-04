import { useCallback } from 'react'

export const useScrollToForm = () => {
  const scrollToForm = useCallback(() => {
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      const bookingFormElement = Array.from(document.querySelectorAll('form')).find((form) => {
        const h2 = form.querySelector('h2')
        return h2?.textContent?.includes('Booking services')
      })

      if (bookingFormElement) {
        bookingFormElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
        return
      }
    }

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
